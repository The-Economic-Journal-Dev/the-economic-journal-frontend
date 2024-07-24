import React, { useState, FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import style from "./SignUp.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signUp } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, username);
      // Handle successful sign up (e.g., redirect to dashboard)
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., display error message)
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>
        Sign{" "}
        <span>
          <div>up</div>
        </span>
      </h1>
      <div className={style.inputHeader}>Username</div>
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <div className={style.inputHeader}>Email</div>
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className={style.inputHeader}>Password</div>
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className={style.inputHeader}>Confirm Password</div>
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
      />
      <div className={style.buttonContainer}>
        <input type="submit" value="Sign Up" className={style.signUpButton} />
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

export default SignUp;
