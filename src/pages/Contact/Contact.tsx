import { email, phoneNumber } from "../../globalInfo";
import { YoutubeButton, FacebookButton, InstagramButton, LinkedInButton, TikTokButton} from "../../components/Socials/SocialMediaButtons"
import Header from "../../components/Header/Header";
import style from "./Contact.module.css";
import { Link } from "react-router-dom";

const Contact = () => {

  return (
    <>
      <Header />
      <section className={style.contactWrap}>
        <div className={style.BGRectangle} />
        <div className={style.contact}>
          <h1>
            Contact <span style={{ color: "#E1A054", margin: "0" }}>U</span>
            <span style={{ color: "#9F0505", margin: "0" }}>S</span>
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "center",
              width: "100%",
              height: "20%",
            }}
          >
            <h5>{email}</h5>
            <h6>{phoneNumber}</h6>
          </div>
          <div className={style.socialsWrap}>
            <YoutubeButton />
            <FacebookButton />
            <InstagramButton />
            <LinkedInButton />
            <TikTokButton />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
