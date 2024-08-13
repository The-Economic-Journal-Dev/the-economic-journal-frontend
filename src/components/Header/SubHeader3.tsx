import { useState } from "react";
import style from "./SubHeader3.module.css";

function SubHeader3() {
    const [menuOpen, setMenuOpen] = useState(false);

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
                <li><a href="/modpage">ModPage</a></li>
            </ul>
        </nav>
    );
}

export default SubHeader3;
