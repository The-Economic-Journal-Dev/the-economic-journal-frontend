import Header from "../../components/Header/Header";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import style from "./Profile.module.css";
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate();

  //Navbar options, for switching between profile pages
  const options = ["Account", "Option 2", "Option 3"];
  const [optionChose, setOptionChose] = useState("Account");

  const optionPressed = (option: string) => {
    setOptionChose(option);
  };

  //Log out function
  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("logged out");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <Header />
      <section className={style.pageWrap}>
        <Navbar
          options={options}
          optionChose={optionChose}
          optionPressed={optionPressed}
        />

        {optionChose == "Account" && (
          <div className={style.page}>
            <h4 style={{ fontWeight: "600" }}>Your account information</h4>
            <div className={style.infoContainer}>
              <h6>Username:</h6>
              <h6 className={style.info}>{auth.currentUser?.displayName}</h6>
            </div>

            <div className={style.infoContainer}>
              <h6>Email:</h6>
              <h6 className={style.info}>{auth.currentUser?.email}</h6>
            </div>

            <div className={style.infoContainer}>
              <h6>Password:</h6>
              <h6 className={style.info}>Password</h6>
            </div>
            <button onClick={logOut}>Log Out</button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;
