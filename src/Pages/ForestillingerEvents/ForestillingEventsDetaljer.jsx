import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Layout } from "../../App/Layout";
import { Anmeldelser } from "../../Components/Anmeldelser/Anmeldelser";
import { AnmeldelserForm } from "../../Components/AnmeldelserFormular/AnmeldelserForm";
import { useAuth } from "../../App/Auth";
import styles from "./ForestillingerEventsDetaljer.module.scss";
import { LoginForm } from "../Login/LoginForm";
import { TiDocumentText } from "react-icons/ti";

export const ForestillingEventsDetaljer = () => {
  const [forestillinger, setForestillinger] = useState([]);
  const { forestilling_id } = useParams(0);
  const { loginData } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `https://api.mediehuset.net/detutroligeteater/events/${forestilling_id}`
      );
      console.log(result.data.item);
      setForestillinger(result.data.item);
    };
    getData();
    //efter kald af funktion den kører kun en gang.
    //vi skriver i dependency forestilling_id, så den re-renderer hver gang vi trykker på id.
  }, [forestilling_id]);

  //formatter dato til dansk og til at udskriv måned
  const dateFormat = (dateString, includeYear = true) => {
    const options = { day: "numeric", month: "long" };
    if (includeYear) {
      options.year = "numeric";
    }
    dateString = new Date(dateString);
    return dateString.toLocaleDateString("da-DK", options);
  };

  return (
    <Layout
      title="Forestillinger og Events detaljer"
      description="Forestillinger og Events detaljer"
    >
      {forestillinger ? (
        <>
          <figure>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${forestillinger.image_large})`,
              }}
            ></div>
            <figcaption className={styles.eventfigcaption}>
              <section className={styles.uppersection}>
                <div>
                  <p>{forestillinger.stage_name}</p>
                  <p>
                    {dateFormat(forestillinger.startdate, false)} -
                    {dateFormat(forestillinger.stopdate)}
                  </p>
                </div>
                <p style={{ marginTop: "1em" }}>
                  BILLETPRIS: {forestillinger.price} DKK
                </p>
              </section>
              <section className={styles.midsection}>
                <div>
                  <h3>{forestillinger.title}</h3>
                  <h4>{forestillinger.genre}</h4>
                </div>
                <button
                  className={styles.købbilletbutton}
                  style={{ marginTop: "1em" }}
                >
                  KØB BILLET
                </button>
              </section>

              <p className={styles.descriptionp}>
                {forestillinger.description}
              </p>
              <p style={{ marginTop: "1em", color: "var(--primarycolor)" }}>
                Varighed ca.{forestillinger.duration_minutes} minutter.
              </p>
            </figcaption>
          </figure>

          {/* MEDVIRKENDE SECCTION ACTORS */}
          <section className={styles.actorsection}>
            <h4>MEDVIRKENDE</h4>
            <section className={styles.actorwrapper}>
              {forestillinger.actors &&
                forestillinger.actors.map((actor) => {
                  return (
                    <NavLink to={`/skuespillere/${actor.id}`} key={actor.id}>
                      <figure className={styles.actorfigure}>
                        <img src={actor.image} alt={actor} />
                        <figcaption>
                          <p>{actor.name}</p>
                        </figcaption>
                      </figure>
                    </NavLink>
                  );
                })}
            </section>
          </section>

          {/* ANMELDELSER SECTION */}
          <section className={styles.andmeldelsersection}>
            <h4>ANMELDELSER</h4>
            <Anmeldelser eventId={forestilling_id} />
          </section>

          {/* SKRIV ANMELDELSE/LOGIN SECTION */}
          <section className={styles.formwrapper}>
            <TiDocumentText />
            <div>
              <p> Skriv en anmeldelse</p>
              {loginData ? (
                <AnmeldelserForm />
              ) : (
                <>
                  <p>Du skal være logget ind for at skrive en anmeldelse</p>
                  <LoginForm />
                </>
              )}
            </div>
          </section>
        </>
      ) : null}
    </Layout>
  );
};
