import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Anmeldelser.module.scss";
import ReactStars from "react-rating-stars-component";

export const Anmeldelser = (props) => {
  const [anmeldelser, setAnmeldelser] = useState();
  const { forestilling_id } = useParams();
  useEffect(() => {
    const getData = async () => {
      const data = `https://api.mediehuset.net/detutroligeteater/reviews?event_id=${props.eventId}`;
      const result = await axios.get(data);
      setAnmeldelser(result.data.items);
    };
    getData();
  }, [forestilling_id, props.eventId]);

  //formatter dato til dansk og til at udskriv måned
  const dateFormat = (dateString) => {
    const options = { day: "numeric", month: "2-digit", year: "numeric" };

    dateString = new Date(dateString);
    return dateString.toLocaleDateString("da-DK", options);
  };

  return (
    anmeldelser &&
    anmeldelser.map((anmeldelse) => {
      return (
        <section key={anmeldelse.id} className={styles.anmeldelsersection}>
          <ReactStars
            count={5}
            value={Number(anmeldelse.num_stars)}
            size={24}
            activeColor="var(--primarycolor)"
            edit={false}
          />
          <p>{dateFormat(anmeldelse.created)}</p>
          <h5>
            {anmeldelse.user.firstname} {anmeldelse.user.lastname}
          </h5>
          <p className={styles.styledp}>{anmeldelse.comment}</p>
        </section>
      );
    })
  );
};
