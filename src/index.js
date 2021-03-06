import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

// CSS
import "./index.css";

// Components
import App from "./app";
var status = "out";
var uuid = null;
var lsin = localStorage.getItem("status");
if (lsin === "in" && localStorage.getItem("uuid") !== "") {
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = () => {
    if (ajax.readyState === 4) {
      try {
        var respons = JSON.parse(ajax.response);
        if (respons.status === "error") {
          alert(respons.message);
        } else if (respons.status === "success") {
          status = "in";
          uuid = respons.uuid;
        }
      } catch (e) {
        console.log(e);
        console.log(ajax.response);
      }
      render(status, uuid);
    }
  };
  ajax.open("POST", "http://localhost/CHATApp/checkcreds.php");
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajax.send("uuid=" + localStorage.getItem("uuid"));
} else {
  render("out", null);
}
function render(s, u) {
  ReactDOM.render(<App status={s} uuid={u} />, document.getElementById("root"));
}
registerServiceWorker();
