import axios from "axios";
import { useEffect, useState } from "react";
import { ForestillingItem } from "../ForestillingItem/ForestillingItem";

export const Forestillinger = () => {
  const [forestillinger, setForestillinger] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        "https://api.mediehuset.net/detutroligeteater/events"
      );
      //tager en stk tifældigt item ud fra array
      const forestillinger = result.data.items
        .sort(() => Math.random() - 0.5)
        .slice(0, 1);
      console.log(result.data.items);
      setForestillinger(forestillinger);
    };
    getData();
  }, []);

  return (
    <section>
      {/* mapper forestillinger med item component */}
      {forestillinger &&
        forestillinger.map((forestilling) => {
          return (
            <ForestillingItem
              key={forestilling.id}
              data={forestilling}
            ></ForestillingItem>
          );
        })}
    </section>
  );
};
