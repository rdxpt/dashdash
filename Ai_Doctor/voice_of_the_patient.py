import os
import logging
import speech_recognition as sr
from pydub import AudioSegment
from io import BytesIO
import shutil  
from groq import Groq
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def check_ffmpeg():
    """Check if FFmpeg is installed"""
    if shutil.which("ffmpeg") is None:
        logging.error("FFmpeg is not installed! Install it using `brew install ffmpeg` (Mac) or `sudo apt install ffmpeg` (Linux).")
        return False
    return True

def select_microphone():
    """List and select a microphone"""
    mic_list = sr.Microphone.list_microphone_names()
    
    if not mic_list:
        logging.error("No microphone detected! Please check your microphone settings.")
        return None
    
    logging.info(f"Available Microphones: {mic_list}")
    return 0  

def record_audio(file_path, timeout=20, phrase_time_limit=None):
    """Records audio from the microphone and saves it as an MP3 file."""
    if not check_ffmpeg():
        return

    mic_index = select_microphone()
    if mic_index is None:
        return

    recognizer = sr.Recognizer()
    
    try:
        with sr.Microphone(device_index=mic_index) as source:
            logging.info("Adjusting for ambient noise...")
            recognizer.adjust_for_ambient_noise(source, duration=1)
            logging.info("Start speaking now...")

            
            audio_data = recognizer.listen(source, timeout=timeout, phrase_time_limit=phrase_time_limit)
            logging.info("Recording complete.")

            
            wav_data = audio_data.get_wav_data()
            audio_segment = AudioSegment.from_wav(BytesIO(wav_data))
            
            
            audio_segment.export(file_path, format="mp3", bitrate="128k")
            logging.info(f"Audio successfully saved to {file_path}")

    except sr.WaitTimeoutError:
        logging.error("No speech detected within the timeout period.")
    except sr.RequestError:
        logging.error("Could not request results from the speech recognition service.")
    except FileNotFoundError:
        logging.error("Pydub or FFmpeg might not be installed correctly. Ensure `ffmpeg` is in your system path.")
    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}", exc_info=True)

def transcribe_with_groq(stt_model, audio_filepath):
    """Transcribes audio using Groq API with improved error handling."""
    try:
        groq_api_key = os.environ.get("GROQ_API_KEY")
        if not groq_api_key:
            logging.error("GROQ_API_KEY is missing. Set it as an environment variable.")
            return "ERROR: GROQ_API_KEY is missing. Please configure your API key."

        # Verify file exists and is readable
        if not os.path.exists(audio_filepath):
            error_msg = f"ERROR: Audio file not found: {audio_filepath}"
            logging.error(error_msg)
            return error_msg
        
        # Check file size (Groq has a 25MB limit)
        file_size = os.path.getsize(audio_filepath) / (1024 * 1024)  # Convert to MB
        if file_size > 25:
            error_msg = f"ERROR: Audio file is too large ({file_size:.2f}MB). Maximum is 25MB."
            logging.error(error_msg)
            return error_msg

        logging.info(f"Transcribing audio file: {audio_filepath} ({file_size:.2f}MB)")
        client = Groq(api_key=groq_api_key)
        
        # Open and transcribe the audio file
        with open(audio_filepath, "rb") as audio_file:
            logging.info("Sending audio to Groq Whisper API...")
            transcription = client.audio.transcriptions.create(
                model=stt_model,
                file=audio_file,
                language="en",
                response_format="text"
            )
        
        # Handle both text and object responses
        if isinstance(transcription, str):
            result_text = transcription
        else:
            result_text = transcription.text
        
        logging.info(f"Transcription successful: {result_text[:100]}...")
        
        # Return error if transcription is empty
        if not result_text or result_text.strip() == "":
            return "ERROR: Could not transcribe audio. Please speak more clearly or check your microphone."
        
        return result_text.strip()
    
    except FileNotFoundError:
        error_msg = f"ERROR: Audio file not found: {audio_filepath}"
        logging.error(error_msg)
        return error_msg
    except Exception as e:
        error_msg = f"ERROR during transcription: {str(e)}"
        logging.error(error_msg)
        logging.error(f"Full error details: {e.__class__.__name__}: {e}")
        return f"Transcription failed: {str(e)}"


if __name__ == "__main__":
    print("Script started...")
    record_audio(file_path="patient_voice_test.mp3")
    print("Script finished.")
