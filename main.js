const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;

function createWindow() {
  win = new BrowserWindow({
    webPreferences: { nodeIntegration: true, enableRemoteModule: true },
    frame: false,
    minWidth: 400,
    minHeight: 600,
    height: 800,
    width: 1200,
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true,
    })
  );
  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

//for mac
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (win == null) createWindow();
});
