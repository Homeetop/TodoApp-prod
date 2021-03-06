const electron = window.require("electron");
const { ipcRenderer, remote } = electron;

export default function send(message) {
  return new Promise((resolve) => {
    ipcRenderer.once("asynchronous-reply", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("asynchronous-message", message);
  });
}
