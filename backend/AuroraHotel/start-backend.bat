@echo off
echo ========================================
echo Aurora Hotel Backend - Starting...
echo ========================================
echo.

cd /d "%~dp0"

echo Cleaning previous build...
call mvn clean

echo.
echo Compiling project...
call mvn compile

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ========================================
    echo COMPILATION FAILED!
    echo ========================================
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Starting Spring Boot application...
call mvn spring-boot:run

pause
