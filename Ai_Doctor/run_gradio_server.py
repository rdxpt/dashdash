import os
import gradio as gr
from dotenv import load_dotenv
import traceback
from datetime import datetime

# Load environment variables from .env file
load_dotenv()

# Verify API keys are loaded
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY")

if not GROQ_API_KEY:
    print("⚠️ WARNING: GROQ_API_KEY not found in environment variables!")
    print("   Please create a .env file with: GROQ_API_KEY=your_key_here")
if not ELEVENLABS_API_KEY:
    print("⚠️ WARNING: ELEVENLABS_API_KEY not found in environment variables!")
    print("   Please create a .env file with: ELEVENLABS_API_KEY=your_key_here")

from brain_of_the_doctor import encode_image, analyze_image_with_query
from voice_of_the_patient import transcribe_with_groq
from voice_of_the_doctor import text_to_speech_with_elevenlabs


system_prompt = (
    "You are a professional medical AI assistant for educational purposes only. "
    "Analyze the provided information carefully and professionally. "
    "If an image is provided, examine it for any visible medical concerns. "
    "Provide a clear, professional assessment with possible causes and recommendations. "
    "Be empathetic, concise, and use natural language. Limit your response to 3-4 sentences. "
    "Always remind the patient to consult a real doctor for proper diagnosis. "
    "Do not mention that you are an AI in your response."
)

def process_inputs(text_input, audio_filepath, image_filepath):
    """Process user inputs and generate AI medical analysis with voice response"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"\n{'='*60}")
    print(f"[{timestamp}] New request received")
    print(f"{'='*60}")
    
    try:
        # Initialize outputs
        speech_to_text_output = ""
        doctor_response = ""
        doctor_voice_filepath = None
        
        # Step 1: Handle text input or audio input
        if text_input and text_input.strip():
            speech_to_text_output = text_input.strip()
            print(f"✓ Text input received: {speech_to_text_output[:80]}...")
        elif audio_filepath:
            print(f"✓ Audio file received: {audio_filepath}")
            try:
                speech_to_text_output = transcribe_with_groq(
                    stt_model="whisper-large-v3",
                    audio_filepath=audio_filepath
                )
                print(f"✓ Transcription complete: {speech_to_text_output[:80]}...")
            except Exception as e:
                error_msg = f"⚠️ Audio transcription failed: {str(e)}"
                print(error_msg)
                return "Transcription Error", f"Could not transcribe audio. Please try recording again or type your symptoms.\n\nError: {str(e)}", None
        else:
            speech_to_text_output = "No input provided"
            print("⚠️ WARNING: No input provided")
            return "No Input", "Please describe your symptoms by typing or recording your voice.", None

        # Step 2: Process image if provided
        if image_filepath:
            print(f"✓ Image file received: {image_filepath}")
            try:
                encoded_image = encode_image(image_filepath)
                if encoded_image:
                    query = system_prompt + "\n\nPatient's concern: " + speech_to_text_output
                    print("🔄 Analyzing image with AI vision model...")
                    doctor_response = analyze_image_with_query(
                        query=query,
                        encoded_image=encoded_image,
                        model="llama-3.2-11b-vision-preview"
                    )
                    print(f"✓ Image analysis complete")
                else:
                    doctor_response = "⚠️ Could not process the image. Please try uploading a clear, well-lit image."
            except Exception as e:
                error_msg = f"⚠️ Image analysis failed: {str(e)}"
                print(error_msg)
                doctor_response = f"I encountered an error while analyzing the image. Please try again.\n\nError: {str(e)}"
        else:
            # If no image, provide text-only response
            print("ℹ️ No image provided, using text-only consultation mode")
            try:
                from groq import Groq
                client = Groq(api_key=GROQ_API_KEY)
                
                print("🔄 Generating text-based medical response...")
                chat_completion = client.chat.completions.create(
                    messages=[
                        {
                            "role": "system",
                            "content": system_prompt
                        },
                        {
                            "role": "user",
                            "content": f"Patient's concern: {speech_to_text_output}"
                        }
                    ],
                    model="llama-3.1-70b-versatile",
                    temperature=0.7,
                    max_tokens=400
                )
                doctor_response = chat_completion.choices[0].message.content
                print("✓ Text-based consultation complete")
            except Exception as e:
                error_msg = f"⚠️ AI consultation failed: {str(e)}"
                print(error_msg)
                doctor_response = f"I apologize, but I'm having trouble connecting to the AI service. Please try again in a moment.\n\nError: {str(e)}"

        # Step 3: Generate voice response
        print("🔄 Generating voice response...")
        try:
            doctor_voice_filepath = text_to_speech_with_elevenlabs(
                input_text=doctor_response,
                output_filepath=f"response_{timestamp.replace(':', '-').replace(' ', '_')}.mp3",
                autoplay=False
            )
            if doctor_voice_filepath:
                print("✓ Voice response generated successfully")
            else:
                print("⚠️ Voice generation failed (using text only)")
        except Exception as e:
            print(f"⚠️ Voice synthesis error: {str(e)}")
            doctor_voice_filepath = None

        print(f"{'='*60}")
        print(f"✓ Request completed successfully")
        print(f"{'='*60}\n")
        
        return speech_to_text_output, doctor_response, doctor_voice_filepath
    
    except Exception as e:
        error_msg = f"❌ CRITICAL ERROR: {str(e)}"
        print(error_msg)
        print(traceback.format_exc())
        return (
            speech_to_text_output if speech_to_text_output else "Error", 
            f"An unexpected error occurred. Please try again.\n\nError details: {str(e)}", 
            None
        )


# Create the Gradio interface with improved layout and modern design
custom_css = """
.gradio-container {
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
}
.main-header {
    text-align: center;
    padding: 2rem 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    margin-bottom: 2rem;
}
.input-section {
    background: #f8f9ff;
    padding: 1.5rem;
    border-radius: 12px;
    border: 2px solid #e0e7ff;
}
.output-section {
    background: #f0fdf4;
    padding: 1.5rem;
    border-radius: 12px;
    border: 2px solid #d1fae5;
}
.status-text {
    font-size: 0.9rem;
    color: #6b7280;
    font-style: italic;
}
"""

with gr.Blocks(title="AI Doctor Assistant", theme=gr.themes.Soft(), css=custom_css) as iface:
    gr.HTML(
        """
        <div class="main-header">
            <h1 style="margin: 0; font-size: 2.5rem; font-weight: 700;">🏥 AI Doctor Assistant</h1>
            <p style="margin: 0.5rem 0 0 0; font-size: 1.1rem; opacity: 0.95;">
                Professional Medical AI Analysis with Vision & Voice
            </p>
        </div>
        """
    )
    
    gr.Markdown(
        """
        ### 📋 How to Use:
        1. **Describe your symptoms** - Type in the text box OR record your voice
        2. **Upload an image** (optional) - For visual medical concerns like skin conditions, X-rays, etc.
        3. **Click "Get AI Analysis"** - Receive professional AI analysis with audio response
        
        ⚠️ **Disclaimer:** This is for educational purposes only. Always consult a licensed medical professional for actual diagnosis and treatment.
        """
    )
    
    with gr.Row():
        with gr.Column(scale=1):
            gr.Markdown("### 📝 Your Symptoms")
            gr.Markdown("*Describe your symptoms in detail*")
            text_input = gr.Textbox(
                placeholder="Example: I have a persistent headache for 3 days with mild fever...",
                label="Type Your Symptoms",
                lines=5
            )
            
            gr.Markdown("**OR**")
            
            gr.Markdown("*Click the microphone icon to start recording. Speak clearly.*")
            audio_input = gr.Audio(
                sources=["microphone", "upload"],
                type="filepath",
                label="🎤 Record Your Voice",
                show_label=True
            )
            
            gr.Markdown("*Upload X-rays, skin photos, or other medical images*")
            image_input = gr.Image(
                type="filepath",
                label="📷 Upload Medical Image (Optional)",
                show_label=True
            )
            
            with gr.Row():
                submit_btn = gr.Button("🔍 Get AI Analysis", variant="primary", size="lg", scale=2)
                clear_btn = gr.ClearButton(
                    components=[text_input, audio_input, image_input], 
                    value="🗑️ Clear All",
                    scale=1
                )
        
        with gr.Column(scale=1):
            gr.Markdown("### 🩺 AI Doctor's Response")
            
            gr.Markdown("*This is what the AI understood from your input*")
            transcription_output = gr.Textbox(
                label="📄 Your Input (Transcribed)",
                lines=3,
                interactive=False
            )
            
            gr.Markdown("*AI-generated medical assessment*")
            diagnosis_output = gr.Textbox(
                label="🔬 Medical Analysis & Recommendations",
                lines=8,
                interactive=False
            )
            
            gr.Markdown("*Audio version of the analysis*")
            audio_output = gr.Audio(
                label="🔊 Listen to Response",
                type="filepath",
                interactive=False,
                autoplay=False
            )
            
            gr.Markdown(
                """
                <div class="status-text">
                💡 <strong>Tip:</strong> You can play the audio response while reading the text analysis.
                </div>
                """
            )
    
    gr.Markdown(
        """
        ---
        ### 💡 Tips for Best Results:
        
        | Feature | Recommendation |
        |---------|---------------|
        | **Text Input** | Be specific: include duration, severity (1-10), location, triggers |
        | **Voice Recording** | Speak clearly, minimize background noise, use a good microphone |
        | **Image Upload** | Use clear, well-lit photos; avoid blurry or dark images |
        | **Symptoms** | Mention: when started, what makes it better/worse, other symptoms |
        
        ### 🔒 Privacy Note:
        Your data is processed securely. Images and audio are only used for this session and are not stored permanently.
        """
    )
    
    # Connect the button to the processing function
    submit_btn.click(
        fn=process_inputs,
        inputs=[text_input, audio_input, image_input],
        outputs=[transcription_output, diagnosis_output, audio_output],
        api_name="analyze"
    )
    
    # Add example buttons for quick testing
    gr.Examples(
        examples=[
            ["I have a severe headache with light sensitivity for 2 days", None, None],
            ["I'm experiencing chest pain when I exercise", None, None],
            ["I have a rash on my arm that's itchy and red", None, None],
        ],
        inputs=[text_input, audio_input, image_input],
        label="📚 Try These Examples"
    )

if __name__ == "__main__":
    print("Starting AI Doctor Server...")
    print(f"GROQ API Key: {'Loaded' if GROQ_API_KEY else 'Missing'}")
    print(f"ElevenLabs API Key: {'Loaded' if ELEVENLABS_API_KEY else 'Missing'}")
    
    # Launch with specific server settings for integration with Next.js
    iface.launch(
        server_name="0.0.0.0",  # Bind to all network interfaces
        server_port=7860,       # Default Gradio port
        share=False,            # Don't use Gradio's sharing feature
        debug=True,
        show_error=True
    )
    
    print("AI Doctor Server is running at http://localhost:7860") 