"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
// 1. Gabage Collection이 일어나지 않도록 함수 밖에 선언함.
var mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        frame: false,
        center: true,
        kiosk: !isDev,
        resizable: true
    });
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
    }
    mainWindow.on('closed', function () {
        mainWindow = undefined;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
