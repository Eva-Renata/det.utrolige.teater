import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../App/Auth";
import { TiDelete } from "react-icons/ti";
import { confirmAlert } from "react-confirm-alert";
import styles from "./MineFavoritter.module.scss";

export const MineFavoritter = () => {
  // fetch alle favoritter
  const [favoritter, setFavoriter] = useState();
  const { loginData } = useAuth();

  useEffect(() => {
    //tjekker loginData, ellers så fejler ved reload !!
    if (!loginData) {
      return;
    }
    const getData = async () => {
      const url = `https://api.mediehuset.net/detutroligeteater/favorites`;
      //brug for token til favoritter
      const options = {
        headers: {
          Authorization: `Bearer ${loginData.access_token}`,
        },
      };
      const result = await axios.get(url, options);
      //sætter favoritter
      setFavoriter(result.data.items);
    };
    getData();
  }, [loginData]);

  //slet funktion
  const removeFavorit = async (favoritter_id) => {
    //brug for token til at slette
    const options = {
      headers: {
        Authorization: `Bearer ${loginData.access_token}`,
      },
    };

    //sikkerheds confirm
    confirmAlert({
      message: "Er du sikker på, at du vil fjerne fra favoritter?",
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

    //hvis du bekræfter
    const Delete = async () => {
      const endpoint = `https://api.mediehuset.net/detutroligeteater/favorites/${favoritter_id}`;
      const result = await axios.delete(endpoint, options);
      //reloader, så vi kan se at den forsvandt
      if (result.status) window.location.reload();
    };
  };

  return (
    <>
      {favoritter && (
        <table>
          <thead className={styles.favoritterThead}>
            <tr>
              <th>Forestilling</th>
              <th>Rediger</th>
            </tr>
          </thead>
          <tbody>
            {favoritter.map((favorite) => {
              return (
                <tr key={favorite.event_id}>
                  <td>
                    {favorite.title}, {favorite.stage_name}
                  </td>
                  <td>
                    <button
                      className={styles.deletebutton}
                      onClick={() => removeFavorit(favorite.event_id)}
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
