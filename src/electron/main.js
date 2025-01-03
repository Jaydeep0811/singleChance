// import { app, BrowserWindow, ipcMain } from "electron";
// import path from "path";
// import { fileURLToPath } from "url";

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path")
const { fileURLToPath } = require("url");

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    // webPreferences: {
    //   preload: path.join(__dirname, "preload.js"),
    //   contextIsolation: true,
    //   enableRemoteModule: false, // Optional: Depending on your Electron setup
    // },
  });
  // console.log(path.join(app.getAppPath(), "/dist-react/index.html"), "qwertyuio");

  mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  // mainWindow.loadFile(path.join(__dirname, "dist-react/index.html"));
});

function printBill(billHTML) {
  const printWindow = new BrowserWindow({
    show: false, // Hidden window
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load the bill HTML
  printWindow.loadURL(
    `data:text/html;charset=utf-8,${encodeURIComponent(billHTML)}`
  );

  printWindow.webContents.on("did-finish-load", () => {
    printWindow.webContents.print(
      { silent: true, printBackground: true },
      (success, failureReason) => {
        if (!success) console.log(`Print failed: ${failureReason}`);
        printWindow.close(); // Close the window after printing
      }
    );
  });
}

ipcMain.on("print-bill", (event, billHTML) => {
  printBill(billHTML);
});


// "type": "module",
