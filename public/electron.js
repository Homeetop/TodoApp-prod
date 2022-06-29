require("./db/dbconn");
const { app, dialog, BrowserWindow } = require("electron");
// const { autoUpdater } = require("electron-updater");
const nativeImage = require("electron").nativeImage;
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    icon: nativeImage.createFromPath(path.join(__dirname, "../assets/todoAppLogo.png")),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

if (!isDev) {
  //init update
  const updater = require("electron-simple-updater");

  updater.init({
    checkUpdateOnStart: false,
    autoDownload: false,
  });

  // check for update every minute
  setInterval(() => {
    updater.checkForUpdates();
    updater.on("update-available", onUpdateAvailable);
  }, 60000);

  const onUpdateAvailable = (meta) => {
    const dialogOpts = {
      type: "info",
      buttons: ["Yes", "No"],
      title: "Application Update",
      message: process.platform === "win32" ? releaseNotes : releaseName,
      detail: `An update version ${meta.version} is available!!!, \n Do you want to download?`,
    };

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) updater.downloadUpdate();
    });
  };
  // Notification for user
  updater.on("update-downloaded", (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: "info",
      buttons: ["Restart", "Later"],
      title: "Application Update",
      message: process.platform === "win32" ? releaseNotes : releaseName,
      detail: "A new version has been downloaded. Restart the application to apply the updates.",
    };

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) updater.quitAndInstall();
    });
  });

  // check for error in updating
  updater.on("error", (message) => {
    console.error("There was a problem updating the application");
    console.error(message);
  });
}
