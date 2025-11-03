# AI Doctor Setup Guide

## ✅ Current Status
All services are running successfully:
- **AI Doctor (Gradio)**: http://localhost:7860
- **Frontend (Next.js)**: http://localhost:3001
- **3D Segmentation**: http://localhost:3004

## 🔧 Recent Fixes Applied

### 1. Removed OpenAI Dependencies
- ✅ Replaced all OpenAI imports with Groq
- ✅ Updated `voice_of_the_patient.py` to use `transcribe_with_groq`
- ✅ Updated `brain_of_the_doctor.py` to use Groq client
- ✅ Removed OpenAI API key requirement

### 2. Voice Recording Improvements
- ✅ Enhanced Gradio interface with clear instructions
- ✅ Added microphone recording support
- ✅ Improved audio transcription with Groq Whisper
- ✅ Better error handling for audio processing
- ✅ Fallback to gTTS if ElevenLabs fails

### 3. Image Analysis
- ✅ Using Groq vision model: `llama-3.2-11b-vision-preview`
- ✅ Base64 image encoding
- ✅ Proper error handling for image processing

### 4. Text-to-Speech
- ✅ ElevenLabs integration for voice output
- ✅ Fallback to Google TTS (gTTS) if needed
- ✅ Truncation of long responses

### 5. User Interface Enhancements
- ✅ Modern Gradio Blocks interface
- ✅ Clear instructions for users
- ✅ Separate input/output sections
- ✅ Real-time feedback and logging
- ✅ Professional medical theme

## 🎯 How to Use

### Text Input
1. Type your symptoms in the text box
2. Click "Get AI Analysis"

### Voice Input
1. Click the microphone icon
2. Allow browser access to microphone
3. Speak clearly describing your symptoms
4. Click "Get AI Analysis"

### Image Analysis
1. Upload a medical image (rash, wound, etc.)
2. Optionally add text/voice description
3. Click "Get AI Analysis"

## 🔑 Environment Variables Required

```env
GROQ_API_KEY=your_groq_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

## 🚀 Starting the Server

```bash
# From project root
c:\Users\rdxpt\cooks\dashdash\Ai_Doctor\venv\Scripts\python.exe c:\Users\rdxpt\cooks\dashdash\Ai_Doctor\run_gradio_server.py
```

## 📦 Dependencies

All dependencies are installed in the virtual environment:
- gradio
- groq
- elevenlabs
- python-dotenv
- gtts
- pydub
- speech_recognition

## ⚠️ Important Notes

1. **Educational Purpose Only**: This AI Doctor is for learning and demonstration purposes. Always consult real medical professionals.

2. **Browser Permissions**: Voice recording requires microphone permission in your browser.

3. **API Limits**: Be aware of API rate limits for Groq and ElevenLabs.

4. **Image Quality**: For best results, upload clear, well-lit images.

## 🐛 Troubleshooting

### Voice Recording Not Working
- Check browser microphone permissions
- Ensure microphone is properly connected
- Try using the upload option instead

### No Audio Output
- Check ElevenLabs API key is valid
- System will fallback to gTTS automatically

### Image Analysis Errors
- Ensure image is in supported format (JPG, PNG)
- Check image file size (not too large)
- Verify Groq API key has vision model access

## 📝 API Models Used

- **Transcription**: `whisper-large-v3` (Groq)
- **Vision Analysis**: `llama-3.2-11b-vision-preview` (Groq)
- **Text Generation**: `llama-3.1-70b-versatile` (Groq)
- **Text-to-Speech**: `eleven_turbo_v2` (ElevenLabs) with gTTS fallback

## 🔄 Recent Updates

- **2025-11-03**: Complete migration from OpenAI to Groq
- **2025-11-03**: Enhanced UI with Gradio Blocks
- **2025-11-03**: Improved error handling and logging
- **2025-11-03**: Added text-only mode when no image provided
- **2025-11-03**: Better voice recording instructions

## 📞 Support

If you encounter any issues, check the terminal output for detailed error messages with emoji indicators:
- 🚀 Server starting
- ✅ Successful operations
- ⚠️ Warnings
- ❌ Errors
- 🎤 Audio processing
- 🖼️ Image processing
- 🔊 Voice generation
