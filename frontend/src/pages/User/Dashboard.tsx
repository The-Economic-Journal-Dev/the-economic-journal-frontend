import style from "./Profile.module.css";
import Header from "../../components/Header/Header";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {

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
      <div>
        <h1>User: {auth.currentUser?.displayName || auth.currentUser?.email}</h1>
      </div>
      <button onClick={logOut}>Log Out</button>
    </>
  );
};

export default Dashboard;
