# AI Doctor Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Get API Keys (Free)

#### Groq API Key (Required - FREE)
1. Go to: https://console.groq.com
2. Sign up with email or Google
3. Click "API Keys" in sidebar
4. Click "Create API Key"
5. Copy the key (starts with `gsk_`)

#### ElevenLabs API Key (Optional - FREE tier available)
1. Go to: https://elevenlabs.io
2. Sign up (get 10,000 free characters/month)
3. Click your profile picture → "Profile + API Key"
4. Copy the API key
5. **Note:** If you skip this, the system will use Google TTS (free but lower quality)

### Step 2: Configure Environment

Create `.env` file in the `Ai_Doctor` folder:

```bash
# Open Ai_Doctor folder and create .env file with:
GROQ_API_KEY=gsk_your_actual_groq_key_here
ELEVENLABS_API_KEY=your_elevenlabs_key_here
```

**PowerShell command to create .env:**
```powershell
cd Ai_Doctor
@"
GROQ_API_KEY=gsk_your_key_here
ELEVENLABS_API_KEY=your_key_here
"@ | Out-File -FilePath .env -Encoding utf8
```

Then edit the file and replace with your actual keys.

### Step 3: Install Dependencies

```powershell
cd Ai_Doctor

# Update packages
.\venv\Scripts\pip.exe install --upgrade pip

# Install all requirements
.\venv\Scripts\pip.exe install -r requirements.txt
```

### Step 4: Test the Server

```powershell
# Start AI Doctor server
.\venv\Scripts\python.exe run_gradio_server.py
```

You should see:
```
✓ GROQ API Key: Loaded
✓ ElevenLabs API Key: Loaded
Starting AI Doctor Server...
Running on local URL:  http://0.0.0.0:7860
```

Visit: http://localhost:7860

### Step 5: Test Features

#### Test 1: Text Input
1. Type: "I have a headache and fever for 2 days"
2. Click "Get AI Analysis"
3. Should get text response and audio

#### Test 2: Voice Recording
1. Click microphone icon in "Record Your Voice"
2. Allow microphone access in browser
3. Speak clearly: "I have a persistent cough"
4. Click stop
5. Click "Get AI Analysis"

#### Test 3: Image Analysis
1. Type or record: "What do you see in this image?"
2. Upload a medical image (X-ray, skin photo, etc.)
3. Click "Get AI Analysis"

## 🎯 Usage Tips

### For Best Voice Recognition:
- **Speak clearly** and at normal pace
- **Reduce background noise**
- **Use a good microphone** (headset recommended)
- **Speak near the mic** (6-12 inches away)

### For Best Image Analysis:
- **Well-lit photos** (avoid shadows)
- **Clear focus** (not blurry)
- **Appropriate angle** (straight-on)
- **File size:** Under 10MB recommended
- **Formats:** JPG, PNG, WEBP

### For Best AI Responses:
Include these details:
- **Duration:** "for 3 days", "since yesterday"
- **Severity:** "mild", "severe", "scale 7/10"
- **Location:** "right side", "lower back"
- **Triggers:** "when I move", "after eating"
- **Associated symptoms:** "with nausea", "and dizziness"

## 📱 Integration with Dashboard

The AI Doctor is automatically integrated into your dashboard at:
```
http://localhost:3000/dashboard
```

Click the "AI" tab in the dashboard to access it within the full application.

## 🔧 Common Issues

### "GROQ_API_KEY not found"
- Check `.env` file exists in `Ai_Doctor` folder
- Verify key is correct (starts with `gsk_`)
- Restart the server after adding key

### Microphone not working
- Allow microphone permissions in browser
- Check browser console (F12) for errors
- Try uploading audio file instead
- Verify microphone works in other apps

### Audio not playing
- Check browser volume/mute
- Verify ElevenLabs key (or use gTTS fallback)
- Download audio file if needed
- Check browser supports MP3

### Image upload fails
- Try smaller file size (compress image)
- Use JPG format
- Check image is not corrupted
- Verify file is under 20MB

## 🎨 Features Overview

### ✅ What Works:
- ✓ Text input for symptoms
- ✓ Voice recording (microphone)
- ✓ Audio file upload
- ✓ Image upload and analysis
- ✓ AI-powered diagnosis
- ✓ Voice responses (audio)
- ✓ Multi-modal analysis (text + image)
- ✓ Error handling and fallbacks
- ✓ Example prompts
- ✓ Responsive UI

### 🔊 Voice Features:
- **Input:** Groq Whisper model (highly accurate)
- **Output:** ElevenLabs (premium) or gTTS (free fallback)
- **Languages:** English (can be extended)
- **Formats:** MP3, WAV, WEBM supported

### 🖼️ Image Analysis:
- **Model:** Llama 3.2 Vision (90B parameters)
- **Types:** X-rays, MRIs, skin photos, general medical images
- **Processing:** Base64 encoding with vision AI
- **Privacy:** Images processed securely, not stored

### 🤖 AI Models:
- **Vision:** Llama 3.2 11B Vision Preview (fast & accurate)
- **Text:** Llama 3.1 70B Versatile (comprehensive)
- **Voice Recognition:** Whisper Large V3 (best accuracy)
- **Voice Synthesis:** ElevenLabs Aria or Google TTS

## 📊 Performance

### Response Times:
- **Text-only:** 2-5 seconds
- **Voice transcription:** 3-8 seconds
- **Image analysis:** 5-15 seconds
- **Voice synthesis:** 2-5 seconds

### Rate Limits (Groq Free Tier):
- 30 requests per minute
- 14,400 tokens per minute
- Should be sufficient for personal use

### ElevenLabs Free Tier:
- 10,000 characters per month
- ~20-30 responses
- Resets monthly

## 🔒 Privacy & Security

- **API Keys:** Stored in `.env` (not committed to git)
- **Data:** Processed on Groq/ElevenLabs servers
- **Storage:** No permanent storage of medical data
- **HIPAA:** This tool is NOT HIPAA compliant
- **Use Case:** Educational and demonstration purposes only

## ⚠️ Important Disclaimers

1. **Not Medical Advice:** This is an AI tool for educational purposes
2. **Consult Real Doctors:** Always seek professional medical advice
3. **No Emergency Use:** Do not use for emergencies - call 911
4. **Accuracy:** AI can make mistakes - verify information
5. **Privacy:** Do not share sensitive personal health information

## 🆘 Need Help?

1. **Check logs:** Terminal shows detailed error messages
2. **Read troubleshooting:** See `TROUBLESHOOTING.md`
3. **Verify API keys:** Check `.env` file
4. **Test connectivity:** Visit API provider websites
5. **Restart services:** `.\stop-all.ps1` then `.\start-all.ps1`

## 🎓 Learning Resources

- **Groq Documentation:** https://console.groq.com/docs
- **Llama Models:** https://ai.meta.com/llama/
- **ElevenLabs Guide:** https://elevenlabs.io/docs
- **Gradio Tutorial:** https://gradio.app/guides/

---

**Ready to start?** Just run:
```powershell
.\start-all.ps1
```

Then open: http://localhost:3000

🎉 Enjoy using your AI Doctor Assistant!
