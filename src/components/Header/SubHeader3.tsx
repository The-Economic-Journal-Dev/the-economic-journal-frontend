import { useState, useEffect } from "react";
import style from "./SubHeader3.module.css";
import {auth} from "../../firebase"

function SubHeader3() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hasPermission, setHasPermission] = useState<Boolean>(false);

    useEffect(()=>{
    const CheckPermission = async () => {
      const idToken = await auth.currentUser?.getIdTokenResult()

      if (!idToken) return setHasPermission(false);

      if (["writer", "admin"].includes((idToken.claims.role) as string)) {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    }

    CheckPermission()
  });

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={style.HeaderNav}>
            <button className={style.menuToggle} onClick={toggleMenu}>
                ☰
            </button>
            <ul className={`${style.menu} ${menuOpen ? style.open : ""}`}>
                <li><a href="/finance">Finance</a></li>
                <li><a href="/economic">Economic</a></li>
                <li><a href="/business">Business</a></li>
                <li><a href="/entrepreneur">Entrepreneurship</a></li>
                <li><a href="/contact">Contact</a></li>
                {hasPermission? <li><a href="/modpage">Modpage</a></li> : ""}   
            </ul>
        </nav>
    );
}

export default SubHeader3;
