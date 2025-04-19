# ================================
# Script para automatizar deploy de Gaschsoft Landing Page
# ================================

Write-Host "[Inicio] Iniciando el proceso de deploy..." -ForegroundColor Green

# Rutas de trabajo
$landingPath = "C:\Proyectos\gaschsoft.github.io\landing-gaschsoft"
$deployPath = "C:\Proyectos\gaschsoft.github.io"

# Ir a carpeta de trabajo
Set-Location $landingPath

# Construir proyecto
Write-Host "[Paso 1] Ejecutando build del proyecto..." -ForegroundColor Cyan
npm run build

# Esperar unos segundos
Start-Sleep -Seconds 2

# Volver a carpeta raíz
Set-Location $deployPath

# Borrar archivos viejos, excepto los importantes
Write-Host "[Paso 2] Eliminando archivos viejos en la raíz..." -ForegroundColor Cyan
Get-ChildItem -Exclude '.git', 'CNAME', 'landing-gaschsoft', 'Script Arbol.txt', 'deploy-gaschsoft.ps1', 'deploy-gaschsoft.bat' | Remove-Item -Recurse -Force

# Copiar nuevo contenido de dist
Write-Host "[Paso 3] Copiando archivos nuevos desde dist/..." -ForegroundColor Cyan
Copy-Item -Path "$landingPath\dist\*" -Destination "$deployPath" -Recurse -Force

Write-Host "[Éxito] Proceso terminado. Recuerda abrir GitHub Desktop para Commit & Push." -ForegroundColor Green
