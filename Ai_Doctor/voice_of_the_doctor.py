import os
import platform
import subprocess
from gtts import gTTS
import elevenlabs
from elevenlabs.client import ElevenLabs
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY")
if not ELEVENLABS_API_KEY:
    raise ValueError(" ERROR: ELEVENLABS_API_KEY is not set in environment variables.")


def play_audio(file_path):
    os_name = platform.system()
    try:
        print(f"🔊 Playing {file_path} using subprocess...", flush=True)
        if os_name == "Darwin":  
            subprocess.run(["afplay", file_path], check=True)
        elif os_name == "Windows":
            subprocess.run(["powershell", "-c", f'(New-Object Media.SoundPlayer "{file_path}").PlaySync();'], check=True)
        elif os_name == "Linux":
            subprocess.run(["aplay", file_path], check=True)
        else:
            raise OSError("Unsupported operating system")
        print(" Audio playback completed successfully!", flush=True)
    except subprocess.CalledProcessError as e:
        print(f" ERROR: Subprocess failed to play audio: {e}", flush=True)
    except Exception as e:
        print(f" ERROR: Unable to play audio: {e}", flush=True)


def text_to_speech_with_gtts(input_text, output_filepath, autoplay=False):
    """Generate speech using Google Text-to-Speech (free fallback)"""
    print("🔄 Generating speech with gTTS (Google TTS)...", flush=True)
    try:
        # Validate input
        if not input_text or input_text.strip() == "":
            print("⚠️ WARNING: Empty text for gTTS", flush=True)
            return None
        
        # Clean and truncate if needed
        input_text = input_text.strip()
        max_length = 5000
        if len(input_text) > max_length:
            input_text = input_text[:max_length] + "..."
        
        # Generate speech
        audioobj = gTTS(text=input_text, lang="en", slow=False)
        print(f"💾 Saving gTTS audio to {output_filepath}...", flush=True)
        audioobj.save(output_filepath)
        
        # Verify file creation
        if os.path.exists(output_filepath):
            file_size = os.path.getsize(output_filepath) / 1024  # KB
            print(f"✓ gTTS speech synthesis complete! ({file_size:.2f} KB)", flush=True)
        else:
            raise FileNotFoundError("gTTS audio file was not created")
        
        if autoplay:
            play_audio(output_filepath)
            
        return output_filepath
        
    except Exception as e:
        print(f"❌ ERROR in gTTS: {e}", flush=True)
        print(f"   Error type: {e.__class__.__name__}", flush=True)
        return None


def text_to_speech_with_elevenlabs(input_text, output_filepath, autoplay=False):
    """Generate speech using ElevenLabs with gTTS fallback"""
    try:
        # Validate input text
        if not input_text or input_text.strip() == "":
            print("⚠️ WARNING: Empty text provided for speech synthesis", flush=True)
            return None
        
        # Clean the input text
        input_text = input_text.strip()
        
        # Check for error messages in the text
        if input_text.startswith("ERROR") or input_text.startswith("⚠️"):
            print("ℹ️ Skipping voice synthesis for error message", flush=True)
            # Still generate audio for errors, but with gTTS
            return text_to_speech_with_gtts(input_text, output_filepath, autoplay)
            
        print("🔄 Checking ElevenLabs API key...", flush=True)
        if not ELEVENLABS_API_KEY or ELEVENLABS_API_KEY.strip() == "":
            print("⚠️ WARNING: ELEVENLABS_API_KEY not configured, using gTTS fallback", flush=True)
            return text_to_speech_with_gtts(input_text, output_filepath, autoplay)
            
        # Initialize ElevenLabs client
        client = ElevenLabs(api_key=ELEVENLABS_API_KEY)
        print("✓ ElevenLabs API Key validated", flush=True)

        print("🔄 Generating speech with ElevenLabs...", flush=True)
        
        # Truncate text if too long (ElevenLabs has character limits)
        max_length = 5000
        original_length = len(input_text)
        if original_length > max_length:
            input_text = input_text[:max_length] + "..."
            print(f"ℹ️ Text truncated from {original_length} to {max_length} characters", flush=True)
        
        # Generate audio with ElevenLabs
        audio = client.generate(
            text=input_text,
            voice="Aria",  # Professional female voice
            output_format="mp3_22050_32",  # Good quality, reasonable file size
            model="eleven_turbo_v2"  # Fast and efficient
        )

        print(f"💾 Saving ElevenLabs audio to {output_filepath}...", flush=True)
        elevenlabs.save(audio, filename=output_filepath)
        
        # Verify file was created
        if os.path.exists(output_filepath):
            file_size = os.path.getsize(output_filepath) / 1024  # KB
            print(f"✓ ElevenLabs speech synthesis complete! ({file_size:.2f} KB)", flush=True)
        else:
            raise FileNotFoundError("Audio file was not created")
        
        if autoplay:
            play_audio(output_filepath)
            
        return output_filepath
        
    except Exception as e:
        print(f"❌ ERROR in ElevenLabs: {e}", flush=True)
        print(f"   Error type: {e.__class__.__name__}", flush=True)
        
        # Fallback to gTTS if ElevenLabs fails
        print("🔄 Falling back to gTTS for voice synthesis...", flush=True)
        return text_to_speech_with_gtts(input_text, output_filepath, autoplay)

if __name__ == "__main__":
    input_text = "Hi, this is Utkarsh"
    gtts_output_file = "gtts_testing.mp3"
    elevenlabs_output_file = "elevenlabs_testing.mp3"
    
    print(" Script started...", flush=True)
    
    text_to_speech_with_gtts(input_text, gtts_output_file, autoplay=True)
    text_to_speech_with_elevenlabs(input_text, elevenlabs_output_file, autoplay=True)
    print(" Script execution finished.", flush=True)
