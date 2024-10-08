import React from 'react';
import Body from "../../components/Body/Body.tsx";
import style from "./NotFound.module.css";
import Soft404 from '../../components/Head/soft-404.tsx';

const NotFound: React.FC = () => {
  return (
    <div className={style.pageContainer}>
      <Soft404 />

      <div className={style.contentWrap}>
        <div className={style.NotFoundContent}>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <a href="/" className={style.HomeButton}>Go to Homepage</a>
        </div>
      </div>


    </div>
  );
};

export default NotFound;
