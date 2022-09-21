import { NavLink } from "react-router-dom";
import styles from "./ForestillingEventItem.module.scss";

export const ForestillingEventItem = (props) => {
  //formatter dato til dansk og til at udskriv måned
  const dateFormat = (dateString, includeYear = true) => {
    const options = { day: "numeric", month: "long" };
    if (includeYear) {
      options.year = "numeric";
    }
    dateString = new Date(dateString);
    return dateString.toLocaleDateString("da-DK", options);
  };

  const forestilling = props.data;
  const type = props.type;
  //hvis type er "hero" vi har forskelligt style
  return type === "hero" ? (
    <section className={styles.herofigurewrapper}>
      <figure>
        <figcaption>
          <p>{forestilling.stage_name}</p>
          <p className={styles.dates}>
            {dateFormat(forestilling.startdate, false)} -
            {dateFormat(forestilling.stopdate)}
          </p>
          <hr></hr>
          <h3>{forestilling.title}</h3>
          <h4>{forestilling.genre}</h4>
        </figcaption>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${forestilling.image})`,
          }}
        ></div>
      </figure>
    </section>
  ) : //hvis den er type "vertical", har vi forskelligt style
  type === "vertical" ? (
    <section className={styles.verticalfigurewrapper}>
      <figure>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${forestilling.image})`,
          }}
        ></div>
        <figcaption>
          <p>{forestilling.stage_name}</p>
          <p className={styles.dates}>
            {dateFormat(forestilling.startdate, false)} -
            {dateFormat(forestilling.stopdate)}
          </p>
          <hr></hr>
          <h3>{forestilling.title}</h3>
          <h4>{forestilling.genre}</h4>
          <NavLink to={`/forestillingerevents/${forestilling.id}`}>
            <button className={styles.læsmerebutton}>LÆS MERE</button>
          </NavLink>

          <button className={styles.købbilletbutton}>KØB BILLET</button>
        </figcaption>
      </figure>
    </section>
  ) : type === "oversigt" ? (
    <section className={styles.oversigtfigurewrapper}>
      <figure>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${forestilling.image})`,
          }}
        ></div>
        <figcaption>
          <h3>{forestilling.title}</h3>

          <div className={styles.ptag}>
            <p>{forestilling.stage_name}</p>
            <p className={styles.dates}>
              {dateFormat(forestilling.startdate, false)} -
              {dateFormat(forestilling.stopdate)}
            </p>
          </div>
          <div>
            <NavLink to={`/forestillingerevents/${forestilling.id}`}>
              <button className={styles.læsmerebutton}>LÆS MERE</button>
            </NavLink>

            <button className={styles.købbilletbutton}>KØB BILLET</button>
          </div>
        </figcaption>
      </figure>
    </section>
  ) : null;
};
