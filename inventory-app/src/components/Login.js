import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["myToken"]);
  const [storeId, setId] = useCookies(["storeId"]);
  const [isLogin, setLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    var user_token = token["myToken"];
    if (String(user_token) === "undefined") {
      navigate("/");
    } else {
      navigate("/home");
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

  const registerBtn = () => {
    APIService.RegisterUser({ username, password })
      .then(() => loginBtn())
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      {isLogin ? <h1>Please Login</h1> : <h1>Please Register</h1>}

      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Please Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Please Enter Pssword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {isLogin ? (
        <button className="btn btn-primary" onClick={loginBtn}>
          Login
        </button>
      ) : (
        <button className="btn btn-primary" onClick={registerBtn}>
          Register
        </button>
      )}

      <div className="mb-3">
        {isLogin ? (
          <h5>
            If you don't have an account, Please{" "}
            <button className="btn btn-primary" onClick={() => setLogin(false)}>
              Register
            </button>{" "}
            here
          </h5>
        ) : (
          <h5>
            If you have an account, Please{" "}
            <button className="btn btn-primary" onClick={() => setLogin(true)}>
              Login
            </button>{" "}
            here
          </h5>
        )}
      </div>
    </div>
  );
}

export default Login;
