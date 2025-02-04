const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const JsBarcode = require("jsbarcode");
const { createCanvas } = require("canvas");


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
  // app.on('activate', () => {
  //   if (BrowserWindow.getAllWindows().length === 0) {
  //     createWindow();
  //   }
  // });
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


ipcMain.on("print-bill", (event, billHTML, barcode) => {
  // RETSOL RTP 82 settings (80mm thermal printer)
  const paperWidthPx = 512; // Slightly reduced width to ensure fit
  const barcodeHeight = 50;
  const fontSize = 12;
  const textMargin = 5;

  let barcodeDataURL = '';

  console.log(barcode, "somer is here");
  
  if (barcode) {
    const canvasHeight = barcodeHeight + fontSize + textMargin;
    const canvas = createCanvas(paperWidthPx, canvasHeight);
    const ctx = canvas.getContext("2d");
  
    // Simplified barcode settings
    JsBarcode(canvas, barcode, {
      format: "CODE128",
      displayValue: false,
      height: barcodeHeight,
      width: 2,
      margin: 10,
      background: "#fff",
      lineColor: "#000",
    });
  
    // Simple text placement
    const text = barcode;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "left";
    ctx.fillStyle = "#000";
    ctx.fillText(text, 10, barcodeHeight + fontSize); // Adjusted text position to be below the barcode

    barcodeDataURL = canvas.toDataURL();
  }

  // Simplified HTML structure
  const styledHTML = /*html*/ `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            width: ${paperWidthPx}px;
            margin: 0;
            padding: 0;
            font-family: Arial;
            font-size: 10px;
          }
          .bill-container {
            width: 100%;
          }
          .barcode {
            text-align: left; /* Align barcode to the left */
            margin: 10px 0;
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
        ${ barcode ? `<div class="barcode">
          <img src="${barcodeDataURL}" alt="Barcode" />
          <p>${barcode}</p>
        </div>` : ''}
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
  console.log("call minimized");
  
  mainWindow.minimize();
});

ipcMain.on("window-close", () => {
  mainWindow.close();
});