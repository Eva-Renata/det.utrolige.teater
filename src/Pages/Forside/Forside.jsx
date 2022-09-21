import { useEffect, useState } from "react";
import { Layout } from "../../App/Layout";
import axios from "axios";
import { ForestillingEventItem } from "../../Components/ForestillingEventItem/ForestillingEventItem";
import styles from "./Forside.module.scss";
import { NavLink } from "react-router-dom";

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
        {/* HERO */}
        <section className={styles.heroforestilling}>
          <ForestillingEventItem
            data={forestillinger[0]}
            type={"hero"}
          ></ForestillingEventItem>
        </section>

        {/* TRE FORESTILLINGER */}
        <section className={styles.flereforestillinger}>
          <ForestillingEventItem
            data={forestillinger[1]}
            type={"vertical"}
          ></ForestillingEventItem>
          <ForestillingEventItem
            data={forestillinger[2]}
            type={"vertical"}
          ></ForestillingEventItem>
          <ForestillingEventItem
            data={forestillinger[3]}
            type={"vertical"}
          ></ForestillingEventItem>
        </section>
        <NavLink to={"/forestillingerevents"}>
          <button className={styles.seallebutton}>
            SE ALLE FORESTILLINGER
          </button>
        </NavLink>
      </Layout>
    )
  );
};
