import axios from "axios";
import { useEffect, useState } from "react";
import { Layout } from "../../App/Layout";
import styles from "./Skuespillere.module.scss";
import { FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const Skuespillere = () => {
  const [skuespillere, setSkuespillere] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        "https://api.mediehuset.net/detutroligeteater/actors"
      );
      //console.log(result.data.items);
      const skuespillere = result.data.items;
      setSkuespillere(skuespillere);
    };
    getData();
  }, []);

  return (
    skuespillere.length && (
      <Layout title="Skuespillere" description="Skuespillere og detaljer">
        <section className={styles.skuespillerewrapper}>
          <h2> Skuespillere</h2>
          {skuespillere.map((skuespiller) => {
            return (
              <figure key={skuespiller.id}>
                {/* tjekker om der er billede, hvis der er ikke, så indsætter icon */}
                {skuespiller.image ? (
                  <img src={skuespiller.image} alt={skuespiller} />
                ) : (
                  <FaUserAlt />
                )}
                <figcaption>
                  <h4>{skuespiller.name}</h4>
                  <p>{skuespiller.description}</p>
                </figcaption>
                <div>
                  <NavLink to={`/skuespillere/${skuespiller.id}`}>
                    <button>LÆS MERE</button>
                  </NavLink>
                </div>
              </figure>
            );
          })}
        </section>
      </Layout>
    )
  );
};
