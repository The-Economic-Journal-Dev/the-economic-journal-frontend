import React, { useState } from "react";
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
            <ul className={`menu ${menuOpen ? "open" : ""}`}>
                <li><a href="/Finance">Finance</a></li>
                <li><a href="/Economic">Economic</a></li>
                <li><a href="/Business">Business</a></li>
                <li><a href="/Entrepreneur">Entrepreneurship</a></li>
                <li><a href="/Contact">Contact</a></li>
                <li><a href="/ModPage">ModPage</a></li>
            </ul>
        </nav>
    );
}

export default SubHeader3;
