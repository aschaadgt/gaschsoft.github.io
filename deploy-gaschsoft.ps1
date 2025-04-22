# ================================
# Script PRO para automatizar deploy de Gaschsoft Landing Page
# ================================

Write-Host "[Inicio] Iniciando el proceso de deploy..." -ForegroundColor Green

# Rutas
$landingPath = "C:\Proyectos\gaschsoft.github.io\landing-gaschsoft"
$deployPath = "C:\Proyectos\gaschsoft.github.io"

# Ir a la carpeta de trabajo
Set-Location $landingPath

# Paso 1: Construir el proyecto
Write-Host "[Paso 1] Ejecutando build del proyecto..." -ForegroundColor Cyan
npm run build

# Esperar
Start-Sleep -Seconds 2

# Volver a la raíz
Set-Location $deployPath

# Paso 2: Borrar archivos viejos (excepto los importantes)
Write-Host "[Paso 2] Eliminando archivos viejos en la raíz..." -ForegroundColor Cyan
Get-ChildItem -Exclude '.git', 'CNAME', 'landing-gaschsoft', 'Script Arbol.txt', 'deploy-gaschsoft.ps1', 'deploy-gaschsoft.bat' | Remove-Item -Recurse -Force

# Paso 3: Copiar nuevo contenido desde dist/
Write-Host "[Paso 3] Copiando archivos nuevos desde dist/..." -ForegroundColor Cyan
Copy-Item -Path "$landingPath\dist\*" -Destination "$deployPath" -Recurse -Force

# Paso 4: Eliminar imágenes innecesarias de la raíz (por si algo se filtró accidentalmente)
Write-Host "[Paso 4] Limpiando imágenes innecesarias..." -ForegroundColor Cyan
Get-ChildItem *.png, *.webp, *.jpg, *.jpeg -ErrorAction SilentlyContinue | Remove-Item -Force

# Paso 5: Git Add, Commit, Push
Write-Host "[Paso 5] Haciendo git add, commit y push..." -ForegroundColor Cyan
git add -A
git commit -m "Deploy: Actualización automática del landing Gaschsoft" --allow-empty
git push origin main

Write-Host "[Éxito] Deploy completo y publicado en GitHub Pages!" -ForegroundColor Green
