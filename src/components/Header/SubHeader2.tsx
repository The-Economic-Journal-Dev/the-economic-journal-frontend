import "./SubHeader2.css";
import logo from "../../../src/assets/house_icon.jpg";
import { auth } from "../../firebase";

function SubHeader2() {
  // NOTE: UNCOMMENT THIS WHEN YOU NEED TO
  // const photoURL = auth.currentUser?.photoURL
  const user = auth.currentUser

  return (
    <div className="top-bar">
      <a href="./HomePage">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span className="separator"></span>
          <h1>
            THE
            <span>
              <div style={{ color: "#E1A054" }}>Economic</div>
              <div style={{ color: "#9F0505" }}>Journal</div>
            </span>
          </h1>
        </div>
      </a>
      <div className="auth-search">
        {user == null && <a href="./signIn">Sign in</a>}
        {user != null && (
          <a href="./Dashboard">
            <img
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
              alt=""
            />
          </a>
        )}
        <span className="separator"></span>
        <button className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  );
}

export default SubHeader2;
