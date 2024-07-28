import SubHeader1 from "../../components/Header/SubHeader1.tsx";
import SubHeader2 from "../../components/Header/SubHeader2.tsx";
import Login from "./component/Login.tsx";
import SignUp from "./component/SignUp.tsx";
import style from "./SignIn.module.css";

function SignIn() {
  return (
    <div>
      <SubHeader1 />
      <SubHeader2 />
      <div className={style.container}>
        <div className={style.bg}></div>
        <div className={style.formContainer} id={style.formContainerSignIn}>
          <Login />
        </div>
        <div className={style.formContainer} id={style.formContainerSignUp}>
          <SignUp />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
