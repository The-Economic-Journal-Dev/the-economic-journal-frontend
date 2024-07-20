import style from "./Body.module.css"
import React from "react";

interface MyComponentProps {
  children: React.ReactNode;
}


const Body: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <div className={style.Body}>
      <div className={style.BGRectangle}></div>
        {children}
    </div>
  );
};

export default Body;