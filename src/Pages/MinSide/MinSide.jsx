import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App/Auth";
import { Layout } from "../../App/Layout";
import styles from "./MinSide.module.scss";
import { BsFillStarFill } from "react-icons/bs";
import { ImTicket } from "react-icons/im";
import { FaHeart } from "react-icons/fa";
import { MineAnmeldelser } from "../../Components/MinSideComponents/MineAnmeldelser";
import { MineFavoritter } from "../../Components/MinSideComponents/MineFavoritter";

export const MinSide = () => {
  // Destructer vars fra useAuth
  const { loginData, setLoginData } = useAuth();
  const navigate = useNavigate();

  // Definerer funktion til log out
  const logOut = () => {
    sessionStorage.removeItem("token");
    setLoginData("");
    navigate("/login");
  };

  return (
    <Layout title="Min side" description="Min side og bruger detaljer">
      <div className={styles.minsidewrapper}>
        <section className={styles.uppersection}>
          <h3>MinSide</h3>

          {/* Vis logindata hvis bruger er logget ind */}
          <div className={styles.loginfeedback}>
            <p>Du er logget ind som {loginData.username}</p>
            <button onClick={logOut}>LOG UD</button>
          </div>
        </section>
        <section className={styles.mineReservationer}>
          <h4>
            {" "}
            <ImTicket />
            MINE RESERVATIONER
          </h4>
        </section>
        <section className={styles.mineFavoritter}>
          <h4>
            {" "}
            <FaHeart />
            MINE FAVORITTER
          </h4>
          <MineFavoritter />
        </section>
        <section className={styles.mineAnmeldelser}>
          <h4>
            {" "}
            <BsFillStarFill />
            MINE ANMELDELSER
          </h4>
          <MineAnmeldelser />
        </section>
      </div>
    </Layout>
  );
};
