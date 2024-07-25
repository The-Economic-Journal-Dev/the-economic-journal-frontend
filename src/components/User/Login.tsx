import { useState, FormEvent } from "react";
import style from "./Login.module.css";
import { auth, googleProvider } from "../../firebase";
import { signInWithEmailAndPassword , signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userFilledAllInputs, setUserFilledAllInputs] = useState(true);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const navigate = useNavigate();
  //const { logIn } = useAuth();

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then();
  };

  const hasUserFilledAllInputs = () => {
    if (email != "" && password != ""){
      setUserFilledAllInputs(true)
      return true
    } else{
      setUserFilledAllInputs(false)
      setWrongCredentials(false);
      return false
    }
  };

  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/HomePage")
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (hasUserFilledAllInputs()) {
      try {
        await logIn(email, password);
        navigate("/HomePage");
      } catch (error) {
        setWrongCredentials(true);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>
        Sign <span>in</span>
      </h1>
      <div className={style.inputHeader}>Users/Email</div>
      <input
        type="text"
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

      {!userFilledAllInputs && (
        <div>Please fill in all the necessary information</div>
      )}
      {wrongCredentials && <div>Wrong email or password</div>}

      <div className={style.buttonContainer}>
        <input type="submit" value="Login" className={style.signInButton} />
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

export default Login;
