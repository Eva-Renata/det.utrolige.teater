import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useAuth } from "../../App/Auth";

export const FavoriterIcon = () => {
  const { forestilling_id } = useParams();
  const { loginData } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  //make a state with the list of favorites
  const [favorites, setFavorites] = useState(
    JSON.parse(sessionStorage.getItem("favorites"))
  );

  // Kalder useEffect
  useEffect(() => {
    // Hvis vi allerede har favoritter...
    if (favorites.length) {
      // Setter bool efter om produkt ligger i listen over favoritter
      setIsFavorite(() => favorites.includes(forestilling_id));
    }
  }, [favorites, forestilling_id]);
  const addToFavorites = async () => {
    const formData = new FormData();
    //create form data object to send to the api
    formData.append("event_id", forestilling_id);
    //making post request
    try {
      await axios.post(
        "https://api.mediehuset.net/detutroligeteater/favorites",
        formData,
        {
          //sending the token for authorization
          headers: {
            Authorization: "Bearer " + loginData.access_token,
          },
        }
      );
      // update the favorites state with the newest event id
      favorites.push(forestilling_id);
      setIsFavorite(true);
      // update session storage
      sessionStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {}
  };
  const removeFromFavorites = async () => {
    // Delete request til api endpoint
    await axios.delete(
      `https://api.mediehuset.net/detutroligeteater/favorites/${forestilling_id}`,
      {
        //sending the token for authorization
        headers: {
          Authorization: "Bearer " + loginData.access_token,
        },
      }
    );
    setIsFavorite(false);
  };
  return isFavorite ? (
    <AiFillHeart onClick={removeFromFavorites} />
  ) : (
    <AiOutlineHeart onClick={addToFavorites} />
  );
};
