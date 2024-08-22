import { useState, useEffect } from "react";
import style from "./SubHeader3.module.css";
import { auth } from "../../firebase";

function SubHeader3() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdTokenResult();
        if (["writer", "admin"].includes(idToken.claims.role as string)) {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      } else {
        setHasPermission(false);
      }
      setAuthInitialized(true); // Set to true once auth state is checked
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!authInitialized) {
    // Optionally, you can return a loading state here while waiting for auth initialization
    return null;
  }

  return (
    <nav className={style.HeaderNav}>
      <button className={style.menuToggle} onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`${style.menu} ${menuOpen ? style.open : ""}`}>
        <li>
          <a href="/finance">Finance</a>
        </li>
        <li>
          <a href="/economic">Economic</a>
        </li>
        <li>
          <a href="/business">Business</a>
        </li>
        <li>
          <a href="/entrepreneur">Entrepreneur</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        {hasPermission && (
          <li>
            <a href="/modpage">Modpage</a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default SubHeader3;
