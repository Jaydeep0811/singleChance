const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const JsBarcode = require("jsbarcode");
const { createCanvas } = require("canvas");
const fs = require("fs");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  mainWindow.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("print-bill", (event, billHTML) => {
  // RETSOL RTP 82 settings (80mm thermal printer)
  const paperWidthPx = 512; // Slightly reduced width to ensure fit
  const barcodeHeight = 50;
  const fontSize = 12;
  const textMargin = 5;

  const canvasHeight = barcodeHeight + fontSize + textMargin;
  const canvas = createCanvas(paperWidthPx, canvasHeight);
  const ctx = canvas.getContext("2d");

  // Simplified barcode settings
  JsBarcode(canvas, "EXAMPLE123456789", {
    format: "CODE128",
    displayValue: false,
    height: barcodeHeight,
    width: 2,
    margin: 10,
    background: "#fff",
    lineColor: "#000",
  });

  // Simple text placement
  const text = "EXAMPLE-123456789";
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = "left";
  ctx.fillStyle = "#000";
  ctx.fillText(text, paperWidthPx / 2, barcodeHeight + fontSize);

  const barcodeDataURL = canvas.toDataURL();

  // Simplified HTML structure
  const styledHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            width: ${paperWidthPx}px;
            margin: 0;
            padding: 0;
            font-family: Arial;
            font-size: 12px;
          }
          .bill-container {
            width: 100%;
          }
          .barcode {
            text-align: center;
            margin: 10px 0;
            margin-left: 0px;
          }
          .barcode img {
            max-width: 100%;
          }
        </style>
      </head>
      <body>
        <div class="bill-container">
          ${billHTML}
        </div>
        <div class="barcode">
          <img src="${barcodeDataURL}" alt="Barcode" >
        </div>
      </body>
    </html>
  `;

  // Create print window
  const printWindow = new BrowserWindow({
    show: false,
    width: paperWidthPx,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Load and print
  printWindow.loadURL(
    `data:text/html;charset=utf-8,${encodeURIComponent(styledHTML)}`
  );

  printWindow.webContents.on("did-finish-load", () => {
    // Basic print settings
    printWindow.webContents.print(
      {
        silent: true,
        printBackground: true,
        margins: {
          marginType: "none",
        },
        landscape: false,
        scaleFactor: 100,
      },
      (success, errorType) => {
        if (!success) {
          console.error(`Print failed: ${errorType}`);
        }
        printWindow.close();
      }
    );
  });
});

ipcMain.on("window-minimize", () => {
  mainWindow.minimize();
});

ipcMain.on("window-close", () => {
  mainWindow.close();
});
