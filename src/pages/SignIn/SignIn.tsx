import Body from "../../components/Body/Body.tsx";
import Login from "./component/Login.tsx";
import SignUp from "./component/SignUp.tsx";
import style from "./SignIn.module.css";

import { TrendingTitleDecoration } from "../HomePage/components/TrendingTitleDecoration.tsx";
function SignIn() {
  return (
      
      <div>

        <div className={style.container}>
          <div className={style.bg}></div>
          <div className={style.formContainer} id={style.formContainerSignIn}>
            <Login/>
          </div>
          <div className={style.formContainer} id={style.formContainerSignUp}>
            <SignUp />
          </div>
        </div>

      </div>
    );
}

export default SignIn;