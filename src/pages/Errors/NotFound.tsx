
import React from 'react';

import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import Body from "../../components/Body/Body.tsx";
import style from "./NotFound.module.css";
import Soft404 from '../../components/Head/soft-404.tsx';

const NotFound: React.FC = () => {
  return (
    <>
  <Soft404 />
      

        <Body>
          <div className={style.contentWrap}>
            <div className={style.NotFoundContent}>
              <h1>404 - Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
              <a href="/" className={style.HomeButton}>Go to Homepage</a>
            </div>
          </div>
        </Body>
        <div className={style.footerWrapper}>
        </div>
    </>
  );
};

export default NotFound;