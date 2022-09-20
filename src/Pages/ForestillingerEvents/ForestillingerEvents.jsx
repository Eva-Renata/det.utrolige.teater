import axios from "axios";
import { useEffect, useState } from "react";
import { Layout } from "../../App/Layout";
import { ForestillingItem } from "../../Components/ForestillingItem/ForestillingItem";
import styles from "./ForestillingerEvents.module.scss";

export const ForestillingerEvents = () => {
  const [forestillinger, setForestillinger] = useState([]);

  useEffect(() => {
    const getData = async () => {
      //fetcher listen af forestillinger
      const result = await axios.get(
        "https://api.mediehuset.net/detutroligeteater/events"
      );
      const forestillinger = result.data.items;
      setForestillinger(forestillinger);
    };
    getData();
  }, []);

  return (
    forestillinger.length && (
      <Layout
        title="Forestillinger og Events"
        description="Forestillinger og Events"
      >
        {/* HERO */}
        <section className={styles.heroforestilling}>
          <ForestillingItem
            data={forestillinger[2]}
            type={"hero"}
          ></ForestillingItem>
        </section>
        <h2> Oversigt</h2>
        <section>
          {/* mapper forestillinger med item component */}
          {forestillinger &&
            forestillinger.map((forestilling) => {
              return (
                <ForestillingItem
                  key={forestilling.id}
                  data={forestilling}
                  type="oversigt"
                ></ForestillingItem>
              );
            })}
        </section>
      </Layout>
    )
  );
};
