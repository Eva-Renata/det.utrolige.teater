import "./Header.module.scss";
import logo from "../../logo.svg";
import { Navigation } from "../Nav/Navigation";
import { BiSearch } from "react-icons/bi";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header>
      <img src={logo} alt="Logo" />
      <section className={styles.headerrightside}>
        <form>
          <input type="text" placeholder={"INDTAST SØGEORD"} />
          <button>
            <BiSearch />
          </button>
        </form>
        <Navigation />
      </section>
    </header>
  );
};
