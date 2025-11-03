# 🏥 AI Doctor - Quick Reference Card

## 🚀 Quick Start
```powershell
# Start all services
.\start-all.ps1

# Or start AI Doctor only
cd Ai_Doctor
.\venv\Scripts\python.exe run_gradio_server.py
```

**Access:** http://localhost:7860

## 🎯 Main Features

| Feature | How to Use | Tips |
|---------|-----------|------|
| **Text Input** | Type in the text box | Be specific, include duration & severity |
| **Voice Recording** | Click microphone icon | Speak clearly, reduce noise |
| **Audio Upload** | Click upload button | MP3, WAV, WEBM supported |
| **Image Analysis** | Upload image | JPG/PNG, well-lit, under 10MB |
| **Get Analysis** | Click "Get AI Analysis" | Wait 5-15 seconds |
| **Audio Response** | Auto-generated | Click play button to listen |

## ⚙️ Configuration

### Required API Keys:
```bash
# Create .env in Ai_Doctor folder
GROQ_API_KEY=gsk_your_key_here
ELEVENLABS_API_KEY=your_key_here  # Optional
```

### Get API Keys:
- **Groq:** https://console.groq.com (FREE)
- **ElevenLabs:** https://elevenlabs.io (10k chars/month FREE)

## 🎤 Voice Recording Tips

✅ **DO:**
- Allow microphone access in browser
- Speak 6-12 inches from mic
- Speak at normal pace
- Reduce background noise
- Use headset for best results

❌ **DON'T:**
- Speak too fast or too slow
- Whisper or shout
- Have loud background noise
- Pause for too long (timeout is 20s)

## 📸 Image Upload Tips

✅ **Good Images:**
- Clear and in-focus
- Well-lit (no shadows)
- Straight-on angle
- JPG or PNG format
- 1-10 MB file size

❌ **Avoid:**
- Blurry photos
- Dark or shadowy images
- Very large files (>20MB)
- Unsupported formats

## 💡 Example Prompts

### Text Examples:
```
"I have a severe headache with light sensitivity for 2 days"
"Persistent cough for a week with mild fever"
"Sharp pain in lower back when I bend"
"Rash on my arm that's itchy and spreading"
```

### With Image:
```
+ Image: "What do you see in this X-ray?"
+ Skin photo: "Is this rash concerning?"
+ Scan: "Can you analyze this MRI scan?"
```

## 🐛 Quick Troubleshooting

| Problem | Quick Fix |
|---------|-----------|
| Microphone not working | Check browser permissions (chrome://settings/content/microphone) |
| No audio playback | Check volume, try downloading audio file |
| API key error | Check .env file, restart server |
| Image won't upload | Try JPG format, reduce size |
| Slow response | Check internet, try smaller inputs |
| Server won't start | Kill port 7860: `netstat -ano \| findstr :7860` |

## 📊 Response Times

- Text-only: **2-5 seconds**
- With voice: **+3-8 seconds**
- With image: **+5-15 seconds**
- Voice synthesis: **+2-5 seconds**

Total: ~15-30 seconds for full multimodal analysis

## 🔧 Commands Reference

```powershell
# Start all servers
.\start-all.ps1

# Stop all servers
.\stop-all.ps1

# Start AI Doctor only
cd Ai_Doctor
.\venv\Scripts\python.exe run_gradio_server.py

# Check if running
netstat -ano | findstr :7860

# Update dependencies
.\venv\Scripts\pip.exe install -r requirements.txt

# Test voice transcription
.\venv\Scripts\python.exe voice_of_the_patient.py

# Test voice synthesis
.\venv\Scripts\python.exe voice_of_the_doctor.py
```

## 📚 Documentation Files

- **QUICKSTART.md** - 5-minute setup guide
- **TROUBLESHOOTING.md** - Fix common issues
- **IMPROVEMENTS.md** - See what's new
- **README.md** - Full documentation

## 🎨 UI Features

### Input Section (Left):
- 📝 Text input box
- 🎤 Voice recorder
- 📷 Image uploader
- 🔍 "Get AI Analysis" button
- 🗑️ "Clear All" button

### Output Section (Right):
- 📄 Transcribed input
- 🔬 AI analysis text
- 🔊 Audio response player

## ⚡ Keyboard Shortcuts

- **Tab** - Navigate between fields
- **Enter** - Submit (when focused on text input)
- **Esc** - Clear all (when focused)

## 🔒 Privacy & Security

- ✓ No permanent data storage
- ✓ Secure API communication
- ✓ Local processing where possible
- ✓ HTTPS for external APIs
- ⚠️ Not HIPAA compliant
- ⚠️ For educational use only

## 📱 Browser Compatibility

| Browser | Voice Recording | Audio Playback | Status |
|---------|----------------|----------------|--------|
| Chrome | ✅ Full support | ✅ | Recommended |
| Edge | ✅ Full support | ✅ | Recommended |
| Firefox | ✅ Full support | ✅ | Works well |
| Safari | ⚠️ Limited | ✅ | Some issues |

## 🎯 Best Practices

1. **Be Specific** - Include duration, severity, location
2. **One Issue at a Time** - Focus on primary concern
3. **Clear Photos** - Use good lighting and focus
4. **Speak Clearly** - For voice input
5. **Be Patient** - AI needs 5-15 seconds to analyze
6. **Verify Information** - Always consult real doctors

## ⚠️ Important Disclaimers

- 🚫 **Not for emergencies** - Call 911 for urgent issues
- 🚫 **Not medical advice** - Educational purposes only
- 🚫 **Not HIPAA compliant** - Don't share sensitive PHI
- ✅ **Always consult doctors** - For actual diagnosis

## 🆘 Need Help?

1. Check **TROUBLESHOOTING.md**
2. Review terminal logs
3. Verify API keys in .env
4. Restart servers
5. Check browser console (F12)

## 🎉 Quick Test

1. Open: http://localhost:7860
2. Click example: "I have a severe headache..."
3. Click "Get AI Analysis"
4. Wait for response
5. Play audio response

**If this works, everything is set up correctly!** ✅

---

**Version:** 2.0 (Nov 2025)
**Status:** ✅ All features working
**Server:** http://localhost:7860
