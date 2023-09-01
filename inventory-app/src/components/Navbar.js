import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../logos/logo_1.png";

function Navbar() {
  const [token, setToken, removeToken] = useCookies(["myToken"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!token["myToken"]) {
      navigate("/");
    }
  }, [token]);

  const logoutBtn = () => {
    removeToken(["myToken"]);
    removeToken(["storeId"]);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={logo} alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/add-item">
                  Add item/ 添加商品
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/stock-table">
                  Stock Table/ 库存
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/report">
                  Report/ 报告
                </a>
              </li>
            </ul>
            <button onClick={logoutBtn} className="btn btn-primary">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
