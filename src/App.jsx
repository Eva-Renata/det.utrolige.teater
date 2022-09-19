import { BrowserRouter } from "react-router-dom";
import "./App.module.scss";
import { AppRouter } from "./App/AppRouter";

export const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};
