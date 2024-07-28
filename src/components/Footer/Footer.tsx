import { FacebookButton, InstagramButton, LinkedInButton, TikTokButton, YoutubeButton } from "../Socials/SocialMediaButtons";
import style from "./Footer.module.css";

function Footer() {
  return (
    <footer className={style.Footer}>
      <div className={style.SocialsWrap}>
        <div className={style.Socials}>
          <YoutubeButton />
          <FacebookButton />
          <InstagramButton />
          <LinkedInButton />
          <TikTokButton />
        </div>
      </div>
      <div className={style.CopyrightWrap}>
        <p>Copyright ©2024 The Economic Journal. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
