@echo off
SETLOCAL

REM ✅ Ruta al proyecto Vite
set VITE_PATH=C:\Proyectos\gaschsoft.github.io\landing-gaschsoft

REM ✅ Ruta al repositorio raíz
set ROOT_REPO=C:\Proyectos\gaschsoft.github.io

echo -----------------------------
echo Generando nuevo build de Vite
echo -----------------------------
cd /d %VITE_PATH%
call npm run build

echo -----------------------------
echo Copiando archivos del dist/
echo -----------------------------
xcopy "%VITE_PATH%\dist\*" "%ROOT_REPO%\" /E /H /Y /C /Q

echo -----------------------------
echo ¡Listo! Ahora ve a GitHub Desktop
echo Revisa los cambios, haz commit y push manualmente
echo -----------------------------
pause
