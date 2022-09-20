import { useEffect, useState } from "react";
import { Layout } from "../../App/Layout";
import axios from "axios";
import { ForestillingItem } from "../../Components/ForestillingItem/ForestillingItem";
import styles from "./Forside.module.scss";

//funktion komponent
export const Forside = () => {
  const [forestillinger, setForestillinger] = useState([]);
  useEffect(() => {
    const getData = async () => {
      //fetcher api, med "?orderby=rand()" så vi får tilfældigt rækkefølge
      const result = await axios.get(
        "https://api.mediehuset.net/detutroligeteater/events?orderby=rand()"
      );
      const forestillinger = result.data.items;
      setForestillinger(forestillinger);
    };
    getData();
  }, []);

  return (
    //printer forestillinger i item componenter, med forskellige styles.
    forestillinger.length && (
      <Layout title="Forside" description="Forsiden af Det utrolige teater">
        <section className={styles.heroforestilling}>
          <ForestillingItem
            data={forestillinger[0]}
            type={"hero"}
          ></ForestillingItem>
        </section>
        <section className={styles.flereforestillinger}>
          <ForestillingItem
            data={forestillinger[1]}
            type={"vertical"}
          ></ForestillingItem>
          <ForestillingItem
            data={forestillinger[2]}
            type={"vertical"}
          ></ForestillingItem>
          <ForestillingItem
            data={forestillinger[3]}
            type={"vertical"}
          ></ForestillingItem>
        </section>
        <button className={styles.seallebutton}>SE ALLE FORESTILLINGER</button>
      </Layout>
    )
  );
};
