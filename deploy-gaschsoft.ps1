# ================================
# Script PRO para automatizar deploy de Gaschsoft Landing Page
# ================================

Write-Host "[Inicio] Iniciando el proceso de deploy..." -ForegroundColor Green

# Rutas
$landingPath = "C:\Proyectos\gaschsoft.github.io\landing-gaschsoft"
$deployPath  = "C:\Proyectos\gaschsoft.github.io"

# Carpetas/archivos que JAMAS deben borrarse del root
$preserve = @(
  ".git",
  "CNAME",
  "landing-gaschsoft",
  "mrpizzasgt",
  "villacaninagt",
  "assets",
  "Script Arbol.txt",
  "deploy-gaschsoft.ps1",
  "deploy-gaschsoft.bat",
  "README.md"
)

# Ir a la carpeta de trabajo
Set-Location $landingPath

# Paso 1: Construir el proyecto
Write-Host "[Paso 1] Ejecutando build del proyecto..." -ForegroundColor Cyan
npm run build

Start-Sleep -Seconds 2

# Volver a la raiz
Set-Location $deployPath

# Paso 2: Borrar SOLO lo que no se debe preservar
Write-Host "[Paso 2] Limpiando raiz (preservando subpaginas)..." -ForegroundColor Cyan
Get-ChildItem -Force |
  Where-Object { $_.Name -notin $preserve } |
  Remove-Item -Recurse -Force

# Paso 3: Copiar nuevo contenido del build (landing principal)
Write-Host "[Paso 3] Copiando archivos nuevos desde dist/..." -ForegroundColor Cyan
Copy-Item -Path "$landingPath\dist\*" -Destination "$deployPath" -Recurse -Force

# Paso 4: Git Add
Write-Host "[Paso 4] Preparando cambios para Git..." -ForegroundColor Cyan
git add -A

# Commit message
$commitMessage = Read-Host "Escribe el detalle del commit despues de 'Deploy:' (ejemplo: 'Actualizacion de servicios')"
git commit -m "Deploy: $commitMessage" --allow-empty

# Push
git push origin main

Write-Host "[Exito] Deploy completo y publicado en GitHub Pages!" -ForegroundColor Green
