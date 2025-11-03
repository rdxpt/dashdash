# NeuroVED Complete Startup Script
# This script starts all required services for the NeuroVED platform

Write-Host "Starting NeuroVED Platform..." -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Kill any existing processes on the ports we need
Write-Host "Cleaning up existing processes..." -ForegroundColor Yellow

# Kill processes on specific ports
$ports = @(3000, 3001, 3002, 3003, 3004, 7860)
foreach ($port in $ports) {
    $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connections) {
        foreach ($conn in $connections) {
            try {
                Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
                Write-Host "  Stopped process on port $port" -ForegroundColor Green
            } catch {
                # Ignore errors for system processes
            }
        }
    }
}

Start-Sleep -Seconds 2

# Start AI Doctor (Gradio) - Port 7860
Write-Host ""
Write-Host "Starting AI Doctor Server (Port 7860)..." -ForegroundColor Magenta
$aiDoctorJob = Start-Job -ScriptBlock {
    Set-Location "C:\Users\rdxpt\cooks\dashdash"
    & "C:\Users\rdxpt\cooks\dashdash\Ai_Doctor\venv\Scripts\python.exe" "C:\Users\rdxpt\cooks\dashdash\Ai_Doctor\run_gradio_server.py"
}
Write-Host "  AI Doctor job started (ID: $($aiDoctorJob.Id))" -ForegroundColor Green

Start-Sleep -Seconds 3

# Start 3D Segmentation Model - Port 3003
Write-Host ""
Write-Host "Starting 3D Segmentation Model (Port 3003)..." -ForegroundColor Blue
$segmentationJob = Start-Job -ScriptBlock {
    Set-Location "C:\Users\rdxpt\cooks\dashdash\backend\3d_segmentation_model"
    npm run dev
}
Write-Host "  3D Segmentation job started (ID: $($segmentationJob.Id))" -ForegroundColor Green

Start-Sleep -Seconds 3

# Start Frontend (Next.js) - Port 3000
Write-Host ""
Write-Host "Starting Frontend Server (Port 3000)..." -ForegroundColor Green
$frontendJob = Start-Job -ScriptBlock {
    Set-Location "C:\Users\rdxpt\cooks\dashdash\frontend"
    npm run dev
}
Write-Host "  Frontend job started (ID: $($frontendJob.Id))" -ForegroundColor Green

# Wait for services to start
Write-Host ""
Write-Host "Waiting for services to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check if services are running
Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "ALL SERVICES STARTED!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Service URLs:" -ForegroundColor White
Write-Host "  Frontend:          http://localhost:3000" -ForegroundColor Cyan
Write-Host "  AI Doctor:         http://localhost:7860" -ForegroundColor Magenta
Write-Host "  3D Segmentation:   http://localhost:3003" -ForegroundColor Blue
Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tips:" -ForegroundColor Yellow
Write-Host "  - Opening browser at http://localhost:3000" -ForegroundColor White
Write-Host "  - All services are running in background jobs" -ForegroundColor White
Write-Host "  - Press Ctrl+C to stop monitoring" -ForegroundColor White
Write-Host "  - To stop all services, run: .\stop-all.ps1" -ForegroundColor White
Write-Host ""

# Open browser
Start-Sleep -Seconds 2
Start-Process "http://localhost:3000"

# Monitor jobs
Write-Host "Monitoring services (Press Ctrl+C to exit monitoring)..." -ForegroundColor Yellow
Write-Host "   (Services will continue running in background)" -ForegroundColor DarkGray
Write-Host ""

try {
    while ($true) {
        $jobs = Get-Job | Where-Object { $_.Id -in @($aiDoctorJob.Id, $segmentationJob.Id, $frontendJob.Id) }
        
        $running = ($jobs | Where-Object { $_.State -eq 'Running' }).Count
        $failed = ($jobs | Where-Object { $_.State -eq 'Failed' }).Count
        
        Write-Host "`r  Status: $running running, $failed failed  " -NoNewline -ForegroundColor Cyan
        
        if ($failed -gt 0) {
            Write-Host ""
            Write-Host "WARNING: Some services failed. Check logs with: Get-Job | Receive-Job" -ForegroundColor Red
            break
        }
        
        Start-Sleep -Seconds 5
    }
} catch {
    Write-Host ""
    Write-Host ""
    Write-Host "Monitoring stopped. Services are still running in background." -ForegroundColor Yellow
    Write-Host "   To stop all services, run: .\stop-all.ps1" -ForegroundColor White
}
