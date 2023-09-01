import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../logos/sgv_group.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["myToken"]);
  const [id, setId] = useCookies(["storeId"]);
  const navigate = useNavigate();

  useEffect(() => {
    var user_token = token["myToken"];
    if (String(user_token) === "undefined") {
      navigate("/");
    } else {
      navigate("/stock-table");
    }
  }, [token]);

  const loginBtn = () => {
    APIService.LoginUser({ username, password })
      .then((resp) => {
        setToken("myToken", resp.token);
        setId("storeId", resp.store_id);
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "10px" }}
            >
              <img src={logo} className="img-fluid" alt="" />
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your username and password!
                  </p>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="username"
                      className="form-control form-control-lg"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={loginBtn}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
