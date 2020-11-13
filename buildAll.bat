@echo off
REM  -----------------------------------
REM | Building Front-end files with npm |
REM  -----------------------------------
echo Building Front-end files with npm

call npm run build

REM  -----------------------------------
REM | Compiling maven files and package |
REM  -----------------------------------
echo Compiling maven files and package

REM  ----------------------
REM | Copy files to server |
REM  ----------------------
echo Copy files to server

rmdir Y:\smart-geo\life-map\dist /S /Q
xcopy dist Y:\smart-geo\life-map\dist /s /i /D /Y

echo Build All DONE
echo You can check here: http://192.168.1.4/netex/smart-geo/life-map
