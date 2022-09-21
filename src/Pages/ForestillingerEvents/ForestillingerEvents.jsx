import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../App/Layout";
import { ForestillingEventItem } from "../../Components/ForestillingEventItem/ForestillingEventItem";
import styles from "./ForestillingerEvents.module.scss";

export const ForestillingerEvents = () => {
  const [forestillinger, setForestillinger] = useState([]);
  const { forestilling_id } = useParams(0);

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
        description="Forestillinger og Events "
      >
        {/* HERO */}
        <section className={styles.heroforestilling}>
          <ForestillingEventItem
            data={forestillinger[2]}
            type={"hero"}
          ></ForestillingEventItem>
        </section>
        <h2> Oversigt</h2>
        <section>
          {/* ALLE FORESTILLINGER OG EVENTS */}
          {forestillinger &&
            forestillinger.map((forestilling) => {
              return (
                <ForestillingEventItem
                  key={forestilling.id}
                  data={forestilling}
                  type="oversigt"
                  forestilling_id={forestilling_id}
                ></ForestillingEventItem>
              );
            })}
        </section>
      </Layout>
    )
  );
};
