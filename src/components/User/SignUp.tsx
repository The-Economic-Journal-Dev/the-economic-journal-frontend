import React, { useState, FormEvent } from "react";
import style from "./SignUp.module.css";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userFilledAllInputs, setUserFilledAllInputs] = useState(true);
  const [confirmPasswordSimilar, setConfirmPasswordSimilar] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signUp = async (email: string, password: string, username: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then();
  };

  const confirmPasswordIsSimilar = () => {
    if (password && confirmPassword && password != confirmPassword) {
      setConfirmPasswordSimilar(false);
      return false;
    } else {
      setConfirmPasswordSimilar(true);
      return true;
    }
  };

  const hasUserFilledAllInputs = () => {
    if (
      username != "" &&
      email != "" &&
      password != "" &&
      confirmPassword != ""
    ) {
      setUserFilledAllInputs(true);
      return true;
    } else {
      setUserFilledAllInputs(false);
      return false;
    }
  };

  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {}
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //Reset states to remove unecessary error messages
    setConfirmPasswordSimilar(true);
    setConfirmPasswordSimilar(true);
    setError("")

    hasUserFilledAllInputs();
    confirmPasswordIsSimilar();
    if (hasUserFilledAllInputs() && confirmPasswordIsSimilar()) {
      try {
        await signUp(email, password, username);
        navigate("/HomePage")
      } catch (error: any) {
        if (error.code == "auth/email-already-in-use"){
            setError("Email is already in use")
        }
      }
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
        type="text"
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
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />

      {!userFilledAllInputs && (
        <div>Please fill all the necessary information</div>
      )}
      {!confirmPasswordSimilar && (
        <div>Confirmed password doesn't match password</div>
      )}
      {error && <div>{error}</div>}
      <div className={style.buttonContainer}>
        <input type="submit" value="Sign Up" className={style.signUpButton} />
      </div>

      <div className={style.alternateLogin}>
        <div className={style.partialBlackLine}></div>
        <p>Or</p>
        <div className={style.partialBlackLine}></div>
      </div>

      <img
        src="../../src/assets/google_icon.png"
        alt=""
        className={style.googleBtn}
        onClick={signUpWithGoogle}
      />
    </form>
  );
};

export default SignUp;
