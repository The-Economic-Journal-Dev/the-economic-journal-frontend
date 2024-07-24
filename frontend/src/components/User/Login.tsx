import React, { useState, FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import style from "./Login.module.css";
import { auth } from "../../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      console.log("Login success")
    } catch (error) {
      console.log(error)
      console.log("Login unsuccessful")
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>
        Sign <span>in</span>
      </h1>
      <div className={style.inputHeader}>Users/Email</div>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className={style.inputHeader}>Password</div>
      <input
        type="password"
        placeholder="Password"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={style.forgotPassword}>
        <a href="#">Forgot password?</a>
      </div>

      <div className={style.buttonContainer}>
        <input type="submit" value="Login" className={style.signInButton} />
      </div>

      <div className={style.alternateLogin}>
        <div className={style.partialBlackLine}></div>
        <p>Or</p>
        <div className={style.partialBlackLine}></div>
      </div>

      <a href="">
        <img
          src="../../src/assets/google_icon.png"
          alt=""
          className={style.googleBtn}
        />
      </a>
    </form>
  );
};

export default Login;
