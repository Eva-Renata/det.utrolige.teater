import { Route, Routes } from "react-router-dom";
import { Forside } from "../Pages/Forside/Forside";
import { ForestillingerEvents } from "../Pages/ForestillingerEvents/ForestillingerEvents";
import { Skuespillere } from "../Pages/Skuespillere/Skuespillere";
import { Login } from "../Pages/Login/Login";
import { NotFound } from "../Pages/NotFound/NotFound";

//alle routes på siden
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Forside />}></Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
      <Route
        path="/forestillingerevents"
        element={<ForestillingerEvents />}
      ></Route>
      <Route path="/skuespillere" element={<Skuespillere />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};
