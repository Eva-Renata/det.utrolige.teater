import { Route, Routes } from "react-router-dom";
import { Forside } from "../Pages/Forside/Forside";
import { ForestillingerEvents } from "../Pages/ForestillingerEvents/ForestillingerEvents";
import { ForestillingEventsDetaljer } from "../Pages/ForestillingerEvents/ForestillingEventsDetaljer";
import { Skuespillere } from "../Pages/Skuespillere/Skuespillere";
import { Login } from "../Pages/Login/Login";
import { NotFound } from "../Pages/NotFound/NotFound";
import { SkuespillerDetails } from "../Pages/Skuespillere/SkuespillerDetails";
import { Anmeldelser } from "../Components/Anmeldelser/Anmeldelser";
import { MinSide } from "../Pages/MinSide/MinSide";

//alle routes på siden
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Forside />}></Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>

      {/* forestillinger og events routes */}
      <Route path="/forestillingerevents">
        <Route index element={<ForestillingerEvents />}></Route>
        <Route
          path=":forestilling_id"
          element={<ForestillingEventsDetaljer />}
        ></Route>
      </Route>

      {/* skuespillere routes */}
      <Route path="/skuespillere">
        <Route index element={<Skuespillere />}></Route>
        <Route path=":skuespiller_id" element={<SkuespillerDetails />}></Route>
      </Route>

      <Route
        path="/forestillingerevents/:forestilling_id/anmeldelser"
        element={<Anmeldelser />}
      ></Route>

      <Route path="/login" element={<Login />}></Route>
      <Route path="/minside" element={<MinSide />}></Route>
    </Routes>
  );
};
