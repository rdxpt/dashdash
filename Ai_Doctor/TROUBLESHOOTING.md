# AI Doctor Troubleshooting Guide

## Common Issues and Solutions

### 🎤 Voice Recording Not Working

#### Issue: Microphone not detected
**Solution:**
1. Check browser permissions - Allow microphone access
2. In Chrome: Settings → Privacy and Security → Site Settings → Microphone
3. Ensure microphone is plugged in and working in other apps
4. Try refreshing the page

#### Issue: "No speech detected" error
**Solution:**
1. Speak louder and closer to the microphone
2. Reduce background noise
3. Check microphone volume in system settings
4. Try uploading a pre-recorded audio file instead

#### Issue: Recording cuts off too early
**Solution:**
- The timeout is set to 20 seconds by default
- Speak continuously without long pauses
- Consider typing your symptoms if they're lengthy

### 🔊 Audio Response Not Playing

#### Issue: Audio file generated but not playing
**Solution:**
1. Check browser audio permissions
2. Ensure audio is not muted in browser
3. Try downloading the audio file and playing it locally
4. Check if your browser supports MP3 playback

#### Issue: No audio generated at all
**Solution:**
1. **Check ElevenLabs API Key:**
   - Open `.env` file in `Ai_Doctor` folder
   - Verify `ELEVENLABS_API_KEY` is set correctly
   - Get API key from: https://elevenlabs.io
   
2. **Fallback to gTTS:**
   - If ElevenLabs fails, system uses Google TTS automatically
   - Check console logs for "Falling back to gTTS"

### 🖼️ Image Upload Issues

#### Issue: Image not being analyzed
**Solution:**
1. **Supported formats:** JPG, JPEG, PNG, WEBP
2. **File size:** Keep under 20MB
3. **Image quality:** Use clear, well-lit photos
4. Check console for encoding errors

#### Issue: "Image encoding failed"
**Solution:**
1. Try a different image format
2. Reduce image file size
3. Ensure image is not corrupted
4. Try converting to JPEG format

### 🤖 AI Analysis Errors

#### Issue: "GROQ_API_KEY is missing"
**Solution:**
1. Create `.env` file in `Ai_Doctor` folder
2. Add: `GROQ_API_KEY=your_actual_api_key_here`
3. Get API key from: https://console.groq.com
4. Restart the server after adding key

#### Issue: "Rate limit exceeded"
**Solution:**
1. Wait a few minutes before trying again
2. Groq has usage limits on free tier
3. Consider upgrading Groq API plan
4. Check your usage at: https://console.groq.com

#### Issue: "Model timeout" or slow responses
**Solution:**
1. Check your internet connection
2. Try during off-peak hours
3. Use smaller images (under 5MB)
4. Simplify your symptom description

### 🔧 Installation Issues

#### Issue: Missing dependencies
**Solution:**
```powershell
cd Ai_Doctor
.\venv\Scripts\pip.exe install -r requirements.txt
```

#### Issue: FFmpeg not found (for audio processing)
**Solution for Windows:**
1. Download FFmpeg from: https://ffmpeg.org/download.html
2. Extract to `C:\ffmpeg`
3. Add to PATH: `C:\ffmpeg\bin`
4. Restart terminal and verify: `ffmpeg -version`

**Quick install with Chocolatey:**
```powershell
choco install ffmpeg
```

#### Issue: PyAudio installation fails
**Solution:**
```powershell
# Windows - download wheel file
# Visit: https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyaudio
# Download appropriate wheel for your Python version
pip install PyAudio-0.2.11-cp311-cp311-win_amd64.whl
```

### 🌐 Server Connection Issues

#### Issue: Gradio server not starting
**Solution:**
1. Check if port 7860 is in use:
   ```powershell
   netstat -ano | findstr :7860
   ```
2. Kill process if needed:
   ```powershell
   taskkill /PID <process_id> /F
   ```
3. Restart server:
   ```powershell
   .\venv\Scripts\python.exe run_gradio_server.py
   ```

#### Issue: "Connection refused" in iframe
**Solution:**
1. Verify server is running: http://localhost:7860
2. Check firewall settings
3. Ensure `server_name="0.0.0.0"` in `run_gradio_server.py`
4. Restart both frontend and backend servers

### 📝 Text Input Issues

#### Issue: Text input not being processed
**Solution:**
1. Ensure text is not empty
2. Click "Get AI Analysis" button
3. Check browser console for errors (F12)
4. Try clearing and re-entering text

### 🔒 API Key Configuration

#### Creating the .env file:
```bash
# In Ai_Doctor folder, create .env file with:
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
ELEVENLABS_API_KEY=xxxxxxxxxxxxxxxxxxxxxxx
```

#### Getting API Keys:

**Groq (Required):**
1. Visit: https://console.groq.com
2. Sign up for free account
3. Go to API Keys section
4. Create new API key
5. Copy key to .env file

**ElevenLabs (Optional - for better voice):**
1. Visit: https://elevenlabs.io
2. Sign up for free account (10,000 chars/month free)
3. Go to Profile → API Keys
4. Copy key to .env file
5. If not configured, system uses free Google TTS

### 🐛 Debugging Tips

#### Enable verbose logging:
```python
# In run_gradio_server.py, the logging is already verbose
# Check terminal output for detailed error messages
```

#### Check browser console:
1. Press F12 in browser
2. Go to Console tab
3. Look for red error messages
4. Check Network tab for failed requests

#### Test components individually:

**Test voice transcription:**
```powershell
cd Ai_Doctor
.\venv\Scripts\python.exe voice_of_the_patient.py
```

**Test voice synthesis:**
```powershell
cd Ai_Doctor
.\venv\Scripts\python.exe voice_of_the_doctor.py
```

**Test image analysis:**
```powershell
cd Ai_Doctor
.\venv\Scripts\python.exe brain_of_the_doctor.py
```

### 📊 Performance Optimization

#### Slow transcription:
- Use shorter audio clips
- Whisper model is quite fast, issue likely network-related
- Check internet speed

#### Slow image analysis:
- Compress images before upload
- Use JPG instead of PNG
- Resize large images to 1920x1080 or smaller

#### Memory issues:
- Close unused applications
- Restart the server periodically
- Clear browser cache

### 🆘 Still Having Issues?

1. **Check the logs:**
   - Terminal output has detailed error messages
   - Look for timestamps and error details

2. **Verify all requirements:**
   ```powershell
   .\venv\Scripts\pip.exe list
   ```

3. **Restart everything:**
   ```powershell
   .\stop-all.ps1
   .\start-all.ps1
   ```

4. **Test with examples:**
   - Use the example buttons in the UI
   - Try text-only input first
   - Add voice/image incrementally

5. **Check API quotas:**
   - Groq Console: https://console.groq.com
   - ElevenLabs Dashboard: https://elevenlabs.io/app/usage

### 📞 Additional Resources

- Groq Documentation: https://console.groq.com/docs
- ElevenLabs API Docs: https://elevenlabs.io/docs
- Gradio Documentation: https://gradio.app/docs
- FFmpeg Guide: https://ffmpeg.org/documentation.html

---

**Note:** Most issues are related to API key configuration or network connectivity. Always check these first!
