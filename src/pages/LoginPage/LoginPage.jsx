import { useState } from "react";
import "../LoginPage/LoginPage.scss";

function LoginPage() {
  const handleLogin = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="login_page">
        <form className="login-form" onSubmit={handleLogin}>
          {/* username */}
          <div className="login-form__username">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              // value={username}
              // onChange={(e) => setUserName(e.target.value)}
              placeholder="ex: emily@emily.com"
            />
          </div>
          {/* password */}
          <div className="login-form__password">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </div>
          <button className="login-form__button">Login</button>
        </form>
        <p className="signup">Signup</p>
      </div>
    </>
  );
}

export default LoginPage;
