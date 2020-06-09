import React, { useState } from "react";
import { errorMsg, redirectTo } from "../../utils";
import { setUserToken, setPlayerId } from "../../store";
import api from "../../api";
import "./Login.css";

const INVALID_USER_AND_PASSWORD_MSG =
  "Invalid User and Password. (Hint: Have you tried with juan@dev.com / 123 ? ;)";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [proceedToGameSetup, setProceedToGameSetup] = useState(false);

  if (proceedToGameSetup) return redirectTo("setup");
  const handleLogin = async () => {
    try {
      const { response } = await api.login(email, password);
      if (response.success) {
        const { token, playerId } = response;
        setUserToken(token);
        setPlayerId(playerId);
        setProceedToGameSetup(true);
      } else {
        setError(INVALID_USER_AND_PASSWORD_MSG);
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
