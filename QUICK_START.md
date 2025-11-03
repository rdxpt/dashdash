# 🚀 NeuroVED Quick Start Guide

## Single Command to Run Everything

### Start All Services
```powershell
.\start-all.ps1
```

This single command will:
- ✅ Clean up any existing processes on required ports
- ✅ Start AI Doctor server (http://localhost:7860)
- ✅ Start 3D Segmentation Model (http://localhost:3003)
- ✅ Start Frontend (http://localhost:3000)
- ✅ Open your browser automatically
- ✅ Monitor all services

### Stop All Services
```powershell
.\stop-all.ps1
```

This will cleanly shut down all running services.

## 📍 Service URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Main application interface |
| AI Doctor | http://localhost:7860 | Medical AI with voice & vision |
| 3D Segmentation | http://localhost:3003 | Brain MRI segmentation |

## 🔧 Requirements

Make sure you have:
- Node.js installed
- Python installed (with virtual environment in `Ai_Doctor/venv`)
- Environment variables set in `Ai_Doctor/.env`:
  - `GROQ_API_KEY`
  - `ELEVENLABS_API_KEY`

## 📝 Manual Commands (Alternative)

If you prefer to start services individually:

### AI Doctor
```powershell
c:\Users\rdxpt\cooks\dashdash\Ai_Doctor\venv\Scripts\python.exe c:\Users\rdxpt\cooks\dashdash\Ai_Doctor\run_gradio_server.py
```

### 3D Segmentation
```powershell
cd backend\3d_segmentation_model
npm run dev
```

### Frontend
```powershell
cd frontend
npm run dev
```

## 🐛 Troubleshooting

### Port Already in Use
Run the stop script first:
```powershell
.\stop-all.ps1
```
Then start again.

### Services Not Starting
Check the terminal output for error messages. Common issues:
- Missing API keys in `.env`
- Node modules not installed (`npm install`)
- Python dependencies not installed

### Check Service Status
```powershell
Get-Job
```

### View Service Logs
```powershell
Get-Job | Receive-Job
```

## 💡 Tips

- The start script runs services in background jobs
- Browser opens automatically to http://localhost:3000
- You can close the PowerShell window and services will continue running
- Always use `stop-all.ps1` for clean shutdown

## 🎯 Quick Test

1. Run `.\start-all.ps1`
2. Wait for "ALL SERVICES STARTED!" message
3. Browser should open automatically
4. Navigate to different services:
   - Main app: http://localhost:3000
   - AI Doctor: http://localhost:7860
   - 3D Viewer: http://localhost:3003

## 📞 Support

If you encounter issues:
1. Run `.\stop-all.ps1`
2. Check error messages
3. Verify API keys in `Ai_Doctor/.env`
4. Run `.\start-all.ps1` again
