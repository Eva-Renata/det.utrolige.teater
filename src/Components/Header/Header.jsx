import "./Header.module.scss";
import logo from "../../logo.svg";
import { Navigation } from "../Nav/Navigation";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";

export const Header = () => {
  return (
    <header>
      <NavLink to={"/"}>
        <img src={logo} alt="Logo" />
      </NavLink>
      <section className={styles.headerrightside}>
        <SearchBar />
        <Navigation />
      </section>
    </header>
  );
};
