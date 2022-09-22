import { useState } from "react";
import { createContext } from "react";

//opretter context
export const SearchContent = createContext();

//den her wrapper, vi skal pakke ind alt, hvor vi vil gerne se resultaten
//funktion komponent
export const SearchWrapper = ({ children }) => {
  const [searchData, setSearchData] = useState("");

  return (
    <SearchContent.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchContent.Provider>
  );
};
