@echo off
title GaschSoft - Validacion de publicacion
powershell -ExecutionPolicy Bypass -File "%~dp0deploy-gaschsoft.ps1"
pause
