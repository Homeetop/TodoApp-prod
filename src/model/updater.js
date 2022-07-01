const electron = window.require("electron");
const { ipcRenderer, remote } = electron;
// const updater = remote.require("electron-simple-updater");

export const getVersionInfo = () => ipcRenderer.invoke("getVersion", "good");

export const getUpdateInfo = () => {
  let value = "";
  ipcRenderer.invoke("getUpdateInfo", { update: "good" }).then((value) => {
    console.log(value);
    if (value === true) {
      value = "Update is ready";
    } else {
      value = "No update now";
    }
  });
  return value;
};
export const checkUpdate = () => {};
