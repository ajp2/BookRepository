import "bootstrap/dist/css/bootstrap.css";
import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Provider from "./components/UserContext";
import App from "./App";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>,
  rootElement
);
