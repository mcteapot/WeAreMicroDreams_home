param(
  [int]$Port = 8000,
  [string]$HostName = "127.0.0.1",
  [switch]$Detached
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$python = (Get-Command python -ErrorAction Stop).Source
$url = "http://${HostName}:${Port}/"
$logPath = Join-Path $root "server.log"

if ($Detached) {
  $command = @"
Set-Location -LiteralPath '$root'
Write-Host 'Serving $root at $url'
Write-Host 'Writing server output to $logPath'
& '$python' -m http.server $Port --bind $HostName *>> '$logPath'
Write-Host 'Server exited. Press Enter to close this window.'
Read-Host
"@

  $encodedCommand = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($command))
  $arguments = @(
    "/c",
    "start",
    "`"We Are Microdreams.ai Preview`"",
    "powershell.exe",
    "-NoExit",
    "-ExecutionPolicy",
    "Bypass",
    "-EncodedCommand",
    $encodedCommand
  )

  Start-Process -FilePath "cmd.exe" -ArgumentList $arguments -WorkingDirectory $root

  Write-Host "Started local preview at $url"
  Write-Host "Close the opened PowerShell window to stop the server."
  exit 0
}

Set-Location -LiteralPath $root
Write-Host "Serving $root at $url"
Write-Host "Press Ctrl+C to stop the server."
& $python -m http.server $Port --bind $HostName
