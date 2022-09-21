import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Layout } from "../../App/Layout";
import styles from "./SkuespillerDetails.module.scss";

export const SkuespillerDetails = () => {
  const [skuespillerDetails, setSkuespillerDetails] = useState();
  const { skuespiller_id } = useParams(0);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `https://api.mediehuset.net/detutroligeteater/actors/${skuespiller_id}`
      );
      setSkuespillerDetails(result.data.item);
    };
    getData();
    //efter kald af funktion den kører kun en gang.
    //vi skriver i dependency skuespiller_id, så den re-renderer hver gang vi trykker på id.
  }, [skuespiller_id]);

  return (
    skuespillerDetails && (
      <Layout title="Skuespiller details" description="Skuespiller detaljer">
        <section>
          <h2>Skuespiller detaljer</h2>
          <figure className={styles.detailsfigure}>
            <img src={skuespillerDetails.image} alt={skuespillerDetails} />
            <figcaption>
              <h4>{skuespillerDetails.name}</h4>
              <p>{skuespillerDetails.description}</p>
            </figcaption>
          </figure>
          <NavLink to={"/skuespillere"}>
            <button className={styles.seallebutton}>ALLE SKUESPILLERE</button>
          </NavLink>
        </section>
      </Layout>
    )
  );
};
