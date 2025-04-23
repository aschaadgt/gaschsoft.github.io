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

# Volver a la raiz
Set-Location $deployPath

# Paso 2: Borrar archivos viejos (excepto los importantes)
Write-Host "[Paso 2] Eliminando archivos viejos en la raiz..." -ForegroundColor Cyan
Get-ChildItem -Exclude '.git', 'CNAME', 'landing-gaschsoft', 'Script Arbol.txt', 'deploy-gaschsoft.ps1', 'deploy-gaschsoft.bat' | Remove-Item -Recurse -Force

# Paso 3: Copiar nuevo contenido
Write-Host "[Paso 3] Copiando archivos nuevos desde dist/..." -ForegroundColor Cyan
Copy-Item -Path "$landingPath\dist\*" -Destination "$deployPath" -Recurse -Force

# Paso 4: Git Add
Write-Host "[Paso 4] Preparando cambios para Git..." -ForegroundColor Cyan
git add -A

# Pedir mensaje de commit al usuario
$commitMessage = Read-Host "Escribe el detalle del commit despues de 'Deploy:' (ejemplo: 'Actualizacion de servicios')"

# Hacer el commit con el mensaje ingresado
git commit -m "Deploy: $commitMessage" --allow-empty

# Hacer push
git push origin main

Write-Host "[Exito] Deploy completo y publicado en GitHub Pages!" -ForegroundColor Green
