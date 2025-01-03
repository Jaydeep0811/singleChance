import { contextBridge, ipcRenderer } from "electron";
// const { contextBridge, ipcRenderer } = require("electron");
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log("It comes here");


contextBridge.exposeInMainWorld("electron", {
  dirname: __dirname,
});

//   const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  send: (channel, data) => {
    const validChannels = ["print-bill"]; // List allowed channels
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
});
