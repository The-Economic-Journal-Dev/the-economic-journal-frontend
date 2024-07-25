import style from "./Footer.module.css";

function Footer() {
  return (
    <footer className={style.Footer}>
      <div className={style.Socials}></div>
      <div className={style.CopyrightWrap}>
        <p>Copyright ©2024 The Economic Journal. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
