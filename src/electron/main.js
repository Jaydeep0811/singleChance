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
  // Receipt Paper Dimensions - adjusted for typical thermal printer
  const paperWidthPx = 180; // Reduced width for thermal paper (usually 58mm/72mm)
  const barcodeHeight = 30; // Reduced height for better fit
  const fontSize = 10;      // Smaller font size
  const textMargin = 3;     // Reduced margin

  // Total Canvas Height = Barcode Height + Text Height + Margin
  const canvasHeight = barcodeHeight + fontSize + textMargin;

  // Create Canvas
  const canvas = createCanvas(paperWidthPx, canvasHeight);
  const ctx = canvas.getContext('2d');

  // Generate Barcode with adjusted parameters
  JsBarcode(canvas, "EXAMPLE123456789", {
    format: "CODE128",
    displayValue: false,
    height: barcodeHeight,
    width: 1,              // Thinner bars
    margin: 5,            // Small margin to prevent cutting
    background: "#ffffff", // Ensure white background
    lineColor: "#000000", // Ensure black lines
  });

  // Draw Custom Text Below Barcode - centered
  const text = "EXAMPLE-123456789";
  ctx.font = `${fontSize}px Arial`; // Removed bold for better printing
  ctx.textAlign = "center";        // Center align text
  ctx.fillStyle = "#000000";       // Ensure black text
  
  // Position the text centered below the barcode
  ctx.fillText(text, paperWidthPx / 2, barcodeHeight + fontSize);

  // Convert Canvas to Data URL
  const barcodeDataURL = canvas.toDataURL();

  // Construct HTML with Barcode
  const styledHTML = `
    <html>
      <head>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-size: 10px;
          }
          body {
            font-family: Arial, sans-serif;
            text-align: left;
            width: ${paperWidthPx}px;
            margin: 0 auto;
          }
          .barcode {
            margin-top: 10px;
            text-align: center;
          }
          .barcode img {
            max-width: 100%;
            height: auto;
          }
        </style>
      </head>
      <body>
        <div class="bill-container">
          ${billHTML}
        </div>
        <div class="barcode">
          <img src="${barcodeDataURL}" alt="Barcode" />
        </div>
      </body>
    </html>
  `;

  // Create Hidden Print Window with specific size
  const printWindow = new BrowserWindow({
    show: false,
    width: paperWidthPx,
    webPreferences: { 
      nodeIntegration: true,
      backgroundThrottling: false // Prevent background throttling
    },
  });

  printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(styledHTML)}`);

  // Adjust Window to Content Size
  printWindow.webContents.on('did-finish-load', () => {
    printWindow.webContents.executeJavaScript(`
      new Promise((resolve) => {
        const width = document.documentElement.scrollWidth;
        const height = document.documentElement.scrollHeight;
        resolve({ width, height });
      });
    `).then(({ width, height }) => {
      printWindow.setBounds({
        x: 0,
        y: 0,
        width: Math.ceil(width),
        height: Math.ceil(height),
      });

      // Optional: Show the window for debugging
      printWindow.show();

      // Print Silently
      printWindow.webContents.print({ silent: true, printBackground: true }, (success, errorType) => {
        if (!success) console.error(`Print failed: ${errorType}`);
        printWindow.close();
      });
    }).catch((err) => {
      console.error("Error resizing window:", err);
    });
  });
});



const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const JsBarcode = require("jsbarcode");
const { createCanvas } = require("canvas");
const fs = require('fs');


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

ipcMain.on('print-bill', (event, billHTML) => {
   // Receipt Paper Dimensions
  const paperWidthPx = 250; // Width in pixels (adjust for your printer)
  const barcodeHeight = 40; // Height of the barcode
  const fontSize = 14;      // Font size for the text below the barcode
  const textMargin = 5;     // Space between the barcode and the text

  // Total Canvas Height = Barcode Height + Text Height + Margin
  const canvasHeight = barcodeHeight + fontSize + textMargin;

  // Create Canvas
  const canvas = createCanvas(paperWidthPx, canvasHeight);
  const ctx = canvas.getContext('2d');

  // Generate Barcode
  JsBarcode(canvas, "EXAMPLE123456789", {
    format: "CODE128",       // Barcode format
    displayValue: false,     // We will render the text manually
    height: barcodeHeight,   // Height of the barcode
    width: 1.5,              // Adjust bar width to fit the receipt
    margin: 0,               // No margin
  });

  // Draw Custom Text Below Barcode
  const text = "EXAMPLE-123456789";
  ctx.font = `bold ${fontSize}px Arial`; // Bold font, specified size
  ctx.textAlign = "left";               // Align text to the left
  ctx.fillStyle = "#000";               // Black text color

  // Position the text just below the barcode
  ctx.fillText(text, 0, barcodeHeight + fontSize);

  // Convert Canvas to Data URL
  const barcodeDataURL = canvas.toDataURL();

  // Construct HTML with Barcode
  const styledHTML = `
    <html>
      <head>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-size: 10px;
          }
          body {
            font-family: Arial, sans-serif;
            text-align: left;
          }
          .barcode {
            margin-top: 20px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <div class="bill-container">
          ${billHTML}
        </div>
        <div class="barcode">
          <img src="${barcodeDataURL}" alt="Codabar Barcode" />
        </div>
      </body>
    </html>
  `;

  // Create Hidden Print Window
  const printWindow = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true },
  });

  printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(styledHTML)}`);

  // Adjust Window to Content Size
  printWindow.webContents.on('did-finish-load', () => {
    printWindow.webContents.executeJavaScript(`
      new Promise((resolve) => {
        const width = document.documentElement.scrollWidth;
        const height = document.documentElement.scrollHeight;
        resolve({ width, height });
      });
    `).then(({ width, height }) => {
      printWindow.setBounds({
        x: 0,
        y: 0,
        width: Math.ceil(width),
        height: Math.ceil(height),
      });

      // Optional: Show the window for debugging
      printWindow.show();

      // Print Silently
      printWindow.webContents.print({ silent: true, printBackground: true }, (success, errorType) => {
        if (!success) console.error(`Print failed: ${errorType}`);
        printWindow.close();
      });
    }).catch((err) => {
      console.error("Error resizing window:", err);
    });
  });
});


ipcMain.on("window-minimize", () => {
  mainWindow.minimize();
});

ipcMain.on("window-close", () => {
  mainWindow.close();
});