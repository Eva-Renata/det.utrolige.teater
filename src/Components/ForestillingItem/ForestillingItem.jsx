import styles from "./ForestillingItem.module.scss";

export const ForestillingItem = (props) => {
  const forestilling = props.data;
  return (
    <section className={styles.figurewrapper}>
      <figure>
        <figcaption>
          <p>{forestilling.stage_name}</p>
          <p className={styles.dates}>
            {forestilling.startdate} - {forestilling.stopdate}
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
  );
};
