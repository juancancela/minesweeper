import React, { useState } from "react";
import { errorMsg } from "../../utils";
import { setUserToken, setPlayerId } from "../../store";
import api from "../../api";
import "./Login.css";
import { Redirect } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [proceedToGameSetup, setProceedToGameSetup] = useState(false);

  if (proceedToGameSetup) {
    return <Redirect to="/game" />;
  }
  const handleLogin = async () => {
    try {
      const { response } = await api.login(email, password);
      if (response.success) {
        const { token, playerId } = response;
        setUserToken(token);
        setPlayerId(playerId);
        setProceedToGameSetup(true);
      } else {
        setError(
          "Invalid User and Password. (Hint: Have you tried with juan@dev.com / 123 ? ;)"
        );
      }
    } catch (err) {
      setError(errorMsg(err));
    }
  };

  return (
    <>
      <div className="Login-container">
        <div className="Login-item">
          <label className="Login-item-label">Email</label>
          <input name="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="Login-item">
          <label className="Login-item-label">Password</label>
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="Login-play-now-btn" onClick={handleLogin}>
          Login
        </button>
        <div />
      </div>
      <div>{error && <div className="Login-error-msg">{error}</div>}</div>
    </>
  );
}
