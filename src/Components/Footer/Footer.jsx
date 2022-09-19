import styles from "./Footer.module.scss";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <section className={styles.infowrapper}>
        <h3>ADRESSE</h3>
        <p>Det utrolige teater</p>
        <p>Havnegade 901</p>
        <p>9000 Aalborg</p>
        <p>EAN 5798003279845</p>
        <p>CVR 1001 1002</p>
      </section>
      <section>
        <h3>BILLETSERVICE</h3>
        <p>Se åbningstider</p>
        <p>Billettelefon: +45 96 31 80 80</p>
        <p>billet@dut.dk</p>
      </section>
      <section>
        <h3>PRAKTISK INFO</h3>
        <p>Kontakt</p>
        <p>Kom trygt i teatret</p>
        <p>Presseside</p>
        <p>Skoleforestillinger</p>
        <p>Teatercaféen</p>
        <p>Handelsbetingelser</p>
      </section>
      <section
        style={{
          textAlign: "center",
        }}
      >
        <Link>
          <AiFillFacebook />
        </Link>
        <Link>
          <AiFillInstagram />
        </Link>
        <Link>
          <AiFillLinkedin />
        </Link>
      </section>
      <section>
        <p>Find vej på kort </p>
      </section>
      <section>
        <h3>ADMINISTRATION</h3>
        <p>Telefon: +45 96 31 80 90</p>
        <p>adm@dut.dk</p>
      </section>
    </footer>
  );
};
