@echo off
setlocal enabledelayedexpansion

:: Detectar ruta actual
set "RUTA=%~dp0"
set "RUTA=%RUTA:~0,-1%"
echo Ruta detectada: %RUTA%

:: Detectar nombre de la carpeta como nombre de proyecto
for %%I in ("%RUTA%") do set "NOMBRE_PROYECTO=%%~nxI"
echo Nombre del proyecto: %NOMBRE_PROYECTO%

:: Inicializar máximo número
set "MAX_NUM=0"

echo Buscando archivos existentes...
:: Buscar archivos existentes tipo "X. Arbol - NombreProyecto"
for %%F in ("%RUTA%\*.txt") do (
    set "FILENAME=%%~nxF"
    echo Evaluando archivo: !FILENAME!
    echo !FILENAME! | findstr /R "^[0-9][0-9]*\. Arbol - %NOMBRE_PROYECTO%\(\.txt\| V[0-9][0-9]*\.txt\)" >nul
    if !errorlevel! == 0 (
        for /f "tokens=1 delims=. " %%A in ("!FILENAME!") do (
            set /a NUM=%%A
            echo --> Detectado número: !NUM!
            if !NUM! GTR !MAX_NUM! (
                set /a MAX_NUM=!NUM!
            )
        )
    )
)

:: Si no encontró ninguno, usar número nuevo
if %MAX_NUM% equ 0 (
    set /a NUEVO_NUM=1
) else (
    set /a NUEVO_NUM=%MAX_NUM%
)
echo Número asignado al proyecto: %NUEVO_NUM%

:: Construir nombre base del archivo
set "NOMBRE_BASE=%NUEVO_NUM%. Arbol - %NOMBRE_PROYECTO%"
set "ARCHIVO=%RUTA%\%NOMBRE_BASE%.txt"
echo Archivo base: %ARCHIVO%

:: Si el archivo base ya existe, crear versiones V1, V2...
if exist "%ARCHIVO%" (
    set /a V=1
    :buscar_version
    set "ARCHIVO=%RUTA%\%NOMBRE_BASE% V%V%.txt"
    echo Verificando versión: %ARCHIVO%
    if exist "%ARCHIVO%" (
        set /a V+=1
        goto buscar_version
    )
)

:: Ejecutar tree y guardar en archivo
echo Ejecutando comando: tree "%RUTA%" /F /A > "%ARCHIVO%"
tree "%RUTA%" /F /A > "%ARCHIVO%"

:: Confirmar si el archivo se creó
if exist "%ARCHIVO%" (
    echo Archivo generado exitosamente: %ARCHIVO%
) else (
    echo ERROR: No se pudo crear el archivo. Revisa permisos o nombre de carpeta.
)

pause
