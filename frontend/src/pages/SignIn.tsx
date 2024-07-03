import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import SubHeader1 from "../components/Header/SubHeader1.tsx";
import SubHeader2 from "../components/Header/SubHeader2.tsx";
import Footer from "../components/Footer/Footer.tsx"
import style from "./SignIn.module.css";

interface PostData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const initialRegisterData: PostData = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const initialLoginData = {
  username: "",
  password: "",
};

function SignIn() {
  const [registerData, setRegisterData] =
    useState<PostData>(initialRegisterData);
  const [loginData, setLoginData] = useState(initialLoginData);
  const [registerResponse, setRegisterResponse] = useState<string>("");
  const [loginResponse, setLoginResponse] = useState<string>("");
  const [registerError, setRegisterError] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterResponse("");
    setRegisterError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register/local",
        registerData
      );
      const data = response.data;
      if (data.success) {
        setRegisterResponse(data.msg + "!");
      }
    } catch (error: any) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        const errMsg = error.response.data.error.message;
        setRegisterError(errMsg);
      } else {
        setRegisterError("An unexpected error occurred");
      }
    }
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginResponse("");
    setLoginError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login/local",
        loginData
      );
      console.log(response);
      const data = response.data;
      if (data.success) {
        setLoginResponse(data.msg + "!");
      }
    } catch (error: any) {
      const errorStatement = error;
      if (errorStatement.response.data === "Bad Request") {
        setLoginError("Please fill in all the blanks");
      } else if (errorStatement.response.data === "Unauthorized") {
        setLoginError("Wrong username or password");
      }
    }
  };

  return (
    <div>
      <SubHeader1 />
      <SubHeader2 />
      <div className={style.container}>
        <div className={style.bg}></div>
        <div className={style.formContainer} id={style.formContainerSignIn}>
          <form onSubmit={handleLoginSubmit}>
            <h1>
              Sign <span>in</span>
            </h1>
            <div className={style.inputHeader}>Users/Email</div>
            <input
              type="text"
              placeholder="User/Email"
              name="username"
              onChange={handleLoginChange}
              value={loginData.username}
            />
            <div className={style.inputHeader}>Password</div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleLoginChange}
              value={loginData.password}
            />
            <div className={style.forgotPassword}>
              <a href="#">Forgot password?</a>
            </div>

            <div className={style.buttonContainer}>
              <input
                type="submit"
                value="Sign In"
                className={style.signInButton}
              />
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
          {loginResponse && <p>{loginResponse}</p>}
          {loginError && <p>{loginError}</p>}
        </div>

        <div className={style.formContainer} id={style.formContainerSignUp}>
          <form onSubmit={handleRegisterSubmit}>
            <h1>
              Sign{" "}
              <span>
                <div>up</div>
              </span>
            </h1>
            <div className={style.inputHeader}>Email</div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleRegisterChange}
              value={registerData.email}
            />
            <div className={style.inputHeader}>Username</div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleRegisterChange}
              value={registerData.username}
            />
            <div className={style.inputHeader}>Password</div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleRegisterChange}
              value={registerData.password}
            />
            <div className={style.inputHeader}>Confirm Password</div>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleRegisterChange}
              value={registerData.confirmPassword}
            />
            <div className={style.buttonContainer}>
              <input
                type="submit"
                value="Sign Up"
                className={style.signUpButton}
              />
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
          {registerResponse && <p>{registerResponse}</p>}
          {registerError && <p>{registerError}</p>}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
