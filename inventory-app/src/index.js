import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Login from "./components/Login";
import AddItem from "./components/AddItem";
import Table from "./components/Table";
import Report from "./components/Report";
import ItemDetails from "./components/ItemDetails";

function Router() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/add-item" element={<AddItem />} />
          <Route exact path="/stock-table" element={<Table />} />
          <Route exact path="/report" element={<Report />} />
          <Route path="/details/:id" element={<ItemDetails />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
