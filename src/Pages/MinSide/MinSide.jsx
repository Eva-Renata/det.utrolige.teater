import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App/Auth";
import { Layout } from "../../App/Layout";
import styles from "./MinSide.module.scss";

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
      <section className={styles.minsidesection}>
        <div className={styles.uppersection}>
          <h3>MinSide</h3>

          {/* Vis logindata hvis bruger er logget ind */}
          <div className={styles.loginfeedback}>
            <p>Du er logget ind som {loginData.username}</p>
            <button onClick={logOut}>LOG UD</button>
          </div>
        </div>
      </section>
    </Layout>
  );
};
