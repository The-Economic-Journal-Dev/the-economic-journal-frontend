import style from "./Profile.module.css";
import Header from "../../components/Header/Header";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  console.log(auth?.currentUser?.email)
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("logged out")
      navigate("/HomePage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      Profile
      <button onClick={logOut}>Log Out</button>
    </>
  );
};

export default Profile;
