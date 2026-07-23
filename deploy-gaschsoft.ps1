# Validación de publicación de GaschSoft
# La portada se sirve directamente desde la raíz del repositorio.
# Este script reemplaza el despliegue legado de Vite/React y no elimina archivos.

$repoPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$gitSafePath = $repoPath -replace "\\", "/"
Set-Location $repoPath

$requiredFiles = @(
  "index.html",
  "site.webmanifest",
  "sw.js",
  "newgaschsoft/assets/gaschsoft.css",
  "newgaschsoft/assets/gaschsoft.js"
)

$childProjects = @(
  "Demo1Pamekgt",
  "Demo2Pamekgt",
  "DemoMotosGT1",
  "DemoMotosGT2",
  "HotelLaUnion",
  "mrpizzasgt",
  "villacaninagt"
)

foreach ($path in $requiredFiles + $childProjects) {
  if (-not (Test-Path -LiteralPath (Join-Path $repoPath $path))) {
    throw "Falta la ruta requerida: $path"
  }
}

Write-Host "[OK] La portada GaschSoft y los proyectos hijos están presentes." -ForegroundColor Green
Write-Host "Revisa los cambios y publica con GitHub: git add -A; git commit; git push origin main" -ForegroundColor Cyan
git -c safe.directory="$gitSafePath" status --short
