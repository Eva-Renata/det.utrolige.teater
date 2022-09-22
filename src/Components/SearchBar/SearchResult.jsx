import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SearchContent } from "./SearchData";
import { Layout } from "../../App/Layout";
import { ForestillingEventItem } from "../ForestillingEventItem/ForestillingEventItem";

export const SearchResult = () => {
  const { searchData } = useContext(SearchContent);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `https://api.mediehuset.net/detutroligeteater/events/search/${searchData}`
      );
      setSearchResult(result.data.items);
      console.log(result.data.items);
    };
    getData();

    //den reloader hver gang searchData ændrer sig
  }, [searchData]);

  return (
    <Layout title="Søgeresultater" description="Søgeresultater ">
      <h2>Søgeresultater</h2>
      {searchResult ? (
        searchResult.map((item) => {
          return (
            <ForestillingEventItem
              key={item.id}
              data={item}
              type="oversigt"
            ></ForestillingEventItem>
          );
        })
      ) : (
        <h3 style={{ textAlign: "center" }}>
          Der var desværre ingen søgeresultater...
        </h3>
      )}
    </Layout>
  );
};
