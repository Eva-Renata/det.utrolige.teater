import ReactStars from "react-rating-stars-component";
import styles from "./AnmeldelserForm.module.scss";

export const AnmeldelserForm = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <section>
      <form className={styles.anmeldelseform}>
        <div style={{ display: "flex" }}>
          <p>Antal stjerner: </p>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={25}
            //activeColor="#ffd700"
            activeColor="var(--tertiarycolor)"
            classNames={styles.stars}
            color="white"
          />
        </div>
        <div>
          <input type="text" placeholder="Emne" />
          <input type="textarea" placeholder="Kommentar" />
        </div>
        <button>SEND</button>
      </form>
    </section>
  );
};
