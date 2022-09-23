import { NavLink } from "react-router-dom";
import { Twirl as Hamburger } from "hamburger-react";
import { useAuth } from "../../App/Auth";
import { useState } from "react";
import styles from "./Navigation.module.scss";

export const Navigation = () => {
  const { loginData } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <ul className={styles.desktopLinks}>
        <li>
          <NavLink to="/">FORSIDE</NavLink>
        </li>
        <li>
          <NavLink to="/forestillingerevents">FORESTILLINGER & EVENTS</NavLink>
        </li>
        <li>
          <NavLink to="/skuespillere">SKUESPILLERE</NavLink>
        </li>
        <li>
          {loginData ? (
            <NavLink to="/minside">MIN SIDE</NavLink>
          ) : (
            <NavLink to="/login">LOGIN</NavLink>
          )}
        </li>
      </ul>

      <div
        className={styles.hambrgerwrapper}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Hamburger color="black" className={styles.hamburger} />
      </div>
      {open && (
        <ul className={styles.navlinksopen}>
          <li>
            <NavLink to="/">FORSIDE</NavLink>
          </li>
          <li>
            <NavLink to="/forestillingerevents">
              FORESTILLINGER & EVENTS
            </NavLink>
          </li>
          <li>
            <NavLink to="/skuespillere">SKUESPILLERE</NavLink>
          </li>
          <li>
            {loginData ? (
              <NavLink to="/minside">MIN SIDE</NavLink>
            ) : (
              <NavLink to="/login">LOGIN</NavLink>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};
