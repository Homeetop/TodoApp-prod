require("./db/dbconn");
const { app, dialog, BrowserWindow, ipcMain } = require("electron");
const log = require("electron-log");
const { autoUpdater } = require("electron-updater");

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
autoUpdater.updateConfigPath = path.join(__dirname, "dev-app-update.yml");
// app.on("ready",createWindow );

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

function sendStatusToWindow(text) {
  log.info(text);
  // win.webContents.send("message", text);
}

//using autoupdater

autoUpdater.on("checking-for-update", () => {
  sendStatusToWindow("Checking for update...");
});
autoUpdater.on("update-available", (ev, info) => {
  sendStatusToWindow("Update available.");
});
autoUpdater.on("update-not-available", (ev, info) => {
  sendStatusToWindow("Update not available.");
});
autoUpdater.on("error", (ev, err) => {
  sendStatusToWindow("Error in auto-updater.");
});
autoUpdater.on("download-progress", (ev, progressObj) => {
  sendStatusToWindow("Download progress...");
});
autoUpdater.on("update-downloaded", (ev, info) => {
  sendStatusToWindow("Update downloaded; will install in 5 seconds");
});

autoUpdater.on("update-downloaded", (ev, info) => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
  setTimeout(function () {
    autoUpdater.quitAndInstall();
  }, 5000);
});

app.on("ready", function () {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

// // if (!isDev) {
// //init update
// const updater = require("electron-simple-updater");

// updater.init({
//   url: "https://raw.githubusercontent.com/Homeetop/TodoAppUpdate-server/main/updates/linux-x64-prod.json",
// });

// function onUpdateAvailable(meta) {
//   alert("update ready!!!");
// }

// function onUpdateDownloading() {
//   console.log("update downloading!!!");
// }

// function onUpdateDownloaded() {
//   console.log("update downloaded");
// }

ipcMain.handle("getVersion", (e, arg) => {
  return app.getVersion();
});
// updater.on("update-available", onUpdateAvailable);
// // updater.on("update-downloading", onUpdateDownloading);
// // updater.on("update-downloaded", onUpdateDownloaded);

// ipcMain.handle("getUpdateInfo", (e, arg) => {
//   updater.checkForUpdates();

//   return false;
// });
// // check for update every minute

// const onUpdateAvailable = (meta) => {
//   console.log("update available");
//   // const dialogOpts = {
//   //   type: "info",
//   //   buttons: ["Yes", "No"],
//   //   title: "Application Update",
//   //   message: process.platform === "win32" ? releaseNotes : releaseName,
//   //   detail: `An update version ${meta.version} is available!!!, \n Do you want to download?`,
//   // };

//   // dialog.showMessageBox(dialogOpts).then((returnValue) => {
//   //   if (returnValue.response === 0) updater.downloadUpdate();
//   // });
// };
// updater.on("update-available", onUpdateAvailable);

// // Notification for user
// updater.on("update-downloaded", (event, releaseNotes, releaseName) => {
//   const dialogOpts = {
//     type: "info",
//     buttons: ["Restart", "Later"],
//     title: "Application Update",
//     message: process.platform === "win32" ? releaseNotes : releaseName,
//     detail: "A new version has been downloaded. Restart the application to apply the updates.",
//   };

//   dialog.showMessageBox(dialogOpts).then((returnValue) => {
//     if (returnValue.response === 0) updater.quitAndInstall();
//   });
// });

// // check for error in updating
// updater.on("error", (message) => {
//   console.error("There was a problem updating the application");
//   console.error(message);
// });
// // }
