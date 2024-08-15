import Body from "../../components/Body/Body.tsx";
import Login from "./component/Login.tsx";
import SignUp from "./component/SignUp.tsx";
import style from "./SignIn.module.css";
import Body from "../../components/Body/Body.tsx";
import { TrendingTitleDecoration } from "../HomePage/components/TrendingTitleDecoration.tsx";
function SignIn() {
  return (
      
      <div>
        <Body>
        <div className={style.container}>
          <div className={style.bg}></div>
          <div className={style.formContainer} id={style.formContainerSignIn}>
            <Login/>
          </div>
          <div className={style.formContainer} id={style.formContainerSignUp}>
            <SignUp />
          </div>
        </div>
        </Body>
      </div>
    );
}

export default SignIn;