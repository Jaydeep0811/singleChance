const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path');

const createWindow = () => {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });;

  mainWindow.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});

ipcMain.on('print-bill', (event, billHTML) => {
  console.log("event occure here");
  
  const printWindow = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true },
  });

  printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(billHTML)}`);

  printWindow.webContents.on('did-finish-load', () => {
    printWindow.webContents.print({ silent: true, printBackground: true }, (success, errorType) => {
      if (!success) console.error(`Print failed: ${errorType}`);
      printWindow.close();
    });
  });
});

ipcMain.on('window-minimize', () => {
  mainWindow.minimize();
});

ipcMain.on('window-close', () => {
  mainWindow.close();
});