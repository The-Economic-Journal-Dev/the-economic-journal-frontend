import {
  youtubeURL,
  facebookURL,
  instagramURL,
  tiktokURL,
  linkedInURL,
} from "../../globalInfo";
import style from "./SocialMediaButtons.module.css";

export const FacebookButton = () => {
  return (
    <a href={facebookURL} className={style.facebookButton}>
      {" "}
      <img src="../../src/assets/facebook_icon.png" alt="facebook" />
    </a>
  );
};

export const InstagramButton = () => {
  return (
    <a href={instagramURL} className={style.instagramButton}>
      {" "}
      <img src="../../src/assets/instagram_icon.png" alt="instagram" />
    </a>
  );
};

export const LinkedInButton = () => {
  return (
    <a href={linkedInURL} className={style.linkedInButton}>
      {" "}
      <img src="../../src/assets/linkedin_icon.png" alt="linkedIn" />
    </a>
  );
};

export const TikTokButton = () => {
  return (
    <a href={tiktokURL} className={style.tiktokButton}>
      {" "}
      <img src="../../src/assets/tiktok_icon.png" alt="tiktok" />
    </a>
  );
};

export const YoutubeButton = () => {
  return (
    <a href={youtubeURL} className={style.youtubeButton}>
      {" "}
      <img src="../../src/assets/youtube_icon.png" alt="youtube" />
    </a>
  );
};
