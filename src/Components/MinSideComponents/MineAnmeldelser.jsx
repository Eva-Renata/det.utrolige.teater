import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../App/Auth";
import ReactStars from "react-rating-stars-component";
import { GoPencil } from "react-icons/go";
import { TiDelete } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import styles from "./MineAnmeldelser.module.scss";
import "./ConfirmStyles.scss";

export const MineAnmeldelser = () => {
  const [anmeldelser, setAnmeldelser] = useState();
  const { loginData } = useAuth();
  const { anmeldelse_id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = `https://api.mediehuset.net/detutroligeteater/reviews`;
      const result = await axios.get(data);
      //console.log(result.data.items);
      //sætter anmeldelser og filtrerer efter bruger_id
      setAnmeldelser(
        result.data.items.filter((anmeldelse) => {
          return anmeldelse.user_id == loginData.user_id;
        })
      );
    };
    getData();
  }, [loginData.user_id, anmeldelse_id]);

  //slet funktion
  const deleteAnmeldelse = async (anmeldelse_id) => {
    const options = {
      headers: {
        Authorization: `Bearer ${loginData.access_token}`,
      },
    };

    confirmAlert({
      title: "Er du sikker på, at du vil slette denne kommentar?",
      buttons: [
        {
          label: "Ja",
          onClick: () => Delete(),
        },
        {
          label: "Nej",
        },
      ],
    });

    const Delete = async () => {
      const endpoint = `https://api.mediehuset.net/detutroligeteater/reviews/${anmeldelse_id}`;
      const result = await axios.delete(endpoint, options);
      if (result.status) window.location.reload();
    };
  };

  return (
    <>
      {anmeldelser && (
        <table className={styles.anmelselserTable}>
          <thead className={styles.anmelselserTablehead}>
            <tr>
              <th>Forestilling</th>
              <th>Emne</th>
              <th>Antal Stjerner</th>
              <th>Rediger</th>
            </tr>
          </thead>
          <tbody>
            {anmeldelser.map((anmeldelse) => {
              return (
                <tr key={anmeldelse.id}>
                  <td>
                    {anmeldelse.event_title}, {anmeldelse.stage_name}
                  </td>
                  <td>{anmeldelse.subject}</td>
                  <td>
                    <ReactStars
                      count={5}
                      value={Number(anmeldelse.num_stars)}
                      size={24}
                      activeColor="var(--primarycolor)"
                      edit={false}
                    />
                  </td>
                  <td>
                    <button className={styles.editbutton}>
                      <GoPencil />
                    </button>
                    <button
                      className={styles.deletebutton}
                      onClick={() => deleteAnmeldelse(anmeldelse.id)}
                    >
                      <TiDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
