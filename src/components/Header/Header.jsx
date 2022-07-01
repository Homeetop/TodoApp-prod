import { getUpdateInfo, getVersionInfo } from "model/updater";
import { useState } from "react";
import "./Header.css";

// const electron = window.require("electron");
// const { remote } = electron;

const Header = () => {
  const [version, setVersion] = useState("");

  const checkForUpdate = () => {
    console.log(getUpdateInfo());
  };
  getVersionInfo().then((res) => {
    setVersion(res);
  });

  return (
    <header className="header">
      <img className="header__icon" src="./svg/main.svg" alt="" />
      <h1 className="header__title">Todo App</h1>
      <p style={{ cursor: "pointer" }} onClick={checkForUpdate}>
        {version}
      </p>
    </header>
  );
};
export default Header;
