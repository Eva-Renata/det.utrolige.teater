import ReactStars from "react-rating-stars-component";
import { useAuth } from "../../App/Auth";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import styles from "./AnmeldelserForm.module.scss";

export const AnmeldelserForm = () => {
  const { loginData } = useAuth();
  const { forestilling_id } = useParams();
  const [stars, setStars] = useState(0);
  const [formFeedback, setFormFeedback] = useState("");

  // Destructer vars fra useForm hook
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm();

  // Definerer funktion til at sende review
  // data contains all form inpunts that we registered
  const sendReview = async (data) => {
    const formData = new FormData();
    //create form data object to send to the api
    formData.append("subject", data.subject);
    formData.append("comment", data.comment);
    formData.append("event_id", forestilling_id);

    //sætter error hvis du ikke vælger stars
    if (!stars) {
      setError("stars");
      return;
    } else {
      formData.append("num_stars", stars);
    }

    //bruger try og catch så vi kan få fat i error
    try {
      //making post request
      const result = await axios.post(
        "https://api.mediehuset.net/detutroligeteater/reviews",
        formData,
        {
          //sending the token for authorization
          headers: {
            Authorization: "Bearer " + loginData.access_token,
          },
        }
      );

      //hvis der ikke er error
      if (!result.error) {
        reset();
        setFormFeedback("Tak for din anmeldelse!");
        window.location.reload();
      }
      //hvis error
    } catch (error) {
      setFormFeedback("Din kommentar kunne ikke gemmes!");
    }
  };

  //function runs when stars are given
  //sets new rating and clearing error
  const ratingChanged = (newRating) => {
    setStars(newRating);
    clearErrors("stars");
  };

  return (
    <section>
      <form
        className={styles.anmeldelseform}
        onSubmit={handleSubmit(sendReview)}
      >
        {/* feedback */}
        {formFeedback && <span>{formFeedback}</span>}
        <div style={{ display: "flex" }}>
          <p>Antal stjerner: </p>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={25}
            activeColor="#ffd700"
            //activeColor="var(--tertiarycolor)"
            classNames={styles.stars}
            color="white"
          />
          {errors.stars && <span>Du skal vælge stjerner!</span>}
        </div>
        <div>
          {/* Register adds the inputs to the form data */}
          <input
            type="text"
            placeholder="Emne"
            {...register("subject", { required: true })}
          />
          {errors.subject && <span>Du skal indtaste emne!</span>}

          <textarea
            placeholder="Kommentar"
            rows="5"
            {...register("comment", { required: true })}
          />
          {errors.comment && <span>Du skal indtaste Kommentar!</span>}
        </div>
        <button>SEND</button>
      </form>
    </section>
  );
};
