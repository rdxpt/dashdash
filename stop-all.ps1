# NeuroVED Stop All Services Script

Write-Host "Stopping NeuroVED Platform..." -ForegroundColor Red
Write-Host "=================================" -ForegroundColor Red
Write-Host ""

# Stop all background jobs
Write-Host "Stopping background jobs..." -ForegroundColor Yellow
$jobs = Get-Job
if ($jobs) {
    $jobs | Stop-Job
    $jobs | Remove-Job -Force
    Write-Host "  All background jobs stopped" -ForegroundColor Green
} else {
    Write-Host "  No background jobs found" -ForegroundColor Gray
}

# Kill processes on specific ports
Write-Host ""
Write-Host "Stopping processes on service ports..." -ForegroundColor Yellow

$ports = @(3000, 3001, 3002, 3003, 3004, 7860)
$stoppedCount = 0

foreach ($port in $ports) {
    $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connections) {
        foreach ($conn in $connections) {
            try {
                $processName = (Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue).ProcessName
                Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
                Write-Host "  Stopped $processName on port $port" -ForegroundColor Green
                $stoppedCount++
            } catch {
                # Ignore errors for system processes
            }
        }
    }
}

if ($stoppedCount -eq 0) {
    Write-Host "  No processes found on service ports" -ForegroundColor Gray
}

# Stop any remaining Node.js and Python processes related to the project
Write-Host ""
Write-Host "Cleaning up Node.js and Python processes..." -ForegroundColor Yellow

$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*dashdash*" }
$pythonProcesses = Get-Process -Name "python" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*dashdash*" }

if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force
    Write-Host "  Stopped $($nodeProcesses.Count) Node.js process(es)" -ForegroundColor Green
}

if ($pythonProcesses) {
    $pythonProcesses | Stop-Process -Force
    Write-Host "  Stopped $($pythonProcesses.Count) Python process(es)" -ForegroundColor Green
}

Write-Host ""
Write-Host "=================================" -ForegroundColor Red
Write-Host "ALL SERVICES STOPPED!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Red
Write-Host ""
