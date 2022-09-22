import ReactStars from "react-rating-stars-component";
import { useAuth } from "../../App/Auth";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./AnmeldelserForm.module.scss";
import { Layout } from "../../App/Layout";

export const AnmeldelseEditForm = () => {
  const { loginData } = useAuth();
  const { anmedelse_id } = useParams();
  const [stars, setStars] = useState(0);
  // null until we fetch completes
  const [anmedelse, setAnmedelse] = useState(null);
  const [formFeedback, setFormFeedback] = useState("");
  const navigate = useNavigate();

  // Destructer vars fra useForm hook
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const getData = async () => {
      const endpoint = `https://api.mediehuset.net/detutroligeteater/reviews/${anmedelse_id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${loginData.access_token}`,
        },
      };

      try {
        if (loginData.access_token) {
          const result = await axios.get(endpoint, options);
          setAnmedelse(result.data);
          setStars(Number(result.data.num_stars));
        }
      } catch (err) {
        setFormFeedback("Problem med redigering af andmedelse");
      }
    };
    getData();
  }, [anmedelse_id, loginData.access_token]);
  // Definerer funktion til at sende review
  // data contains all form inpunts that we registered
  const updateAnmedelse = async (data) => {
    const formData = new URLSearchParams();
    //create url search params object to send to the api
    formData.append("subject", data.subject);
    formData.append("comment", data.comment);
    formData.append("num_stars", stars);
    formData.append("id", anmedelse_id);
    formData.append("active", true);

    //bruger try og catch så vi kan få fat i error
    try {
      //making post request
      const result = await axios.put(
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
        setFormFeedback("Din anmeldelse er redigeret");
        navigate("/minside");
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
    <Layout title="Rediger anmedelse">
      {anmedelse && (
        <section>
          <form
            className={styles.anmeldelseform}
            onSubmit={handleSubmit(updateAnmedelse)}
          >
            {/* feedback */}
            {formFeedback && <span>{formFeedback}</span>}
            <div style={{ display: "flex" }}>
              <p>Antal stjerner: </p>
              <ReactStars
                count={5}
                value={Number(anmedelse.num_stars)}
                onChange={ratingChanged}
                size={25}
                activeColor="#ffd700"
                //activeColor="var(--tertiarycolor)"
                classNames={styles.stars}
                color="white"
              />
              {errors.stars && <span>Du skal vælge stjerner!</span>}
            </div>
            <div className={styles.anminput}>
              {/* Register adds the inputs to the form data */}
              <input
                type="text"
                placeholder="Emne"
                defaultValue={anmedelse.subject}
                {...register("subject", { required: true })}
              />
              {errors.subject && <span>Du skal indtaste emne!</span>}

              <textarea
                placeholder="Kommentar"
                rows="5"
                defaultValue={anmedelse.comment}
                {...register("comment", { required: true })}
              />
              {errors.comment && <span>Du skal indtaste Kommentar!</span>}
            </div>
            <button className={styles.anmeldelseEDITbtn}>SEND</button>
          </form>
        </section>
      )}
    </Layout>
  );
};
