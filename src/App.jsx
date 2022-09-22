import { BrowserRouter } from "react-router-dom";
import "./App.module.scss";
import { AppRouter } from "./App/AppRouter";
import { SearchWrapper } from "./Components/SearchBar/SearchData";

export const App = () => {
  return (
    <BrowserRouter>
      <SearchWrapper>
        <AppRouter />
      </SearchWrapper>
    </BrowserRouter>
  );
};
