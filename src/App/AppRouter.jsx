import { Route, Routes } from "react-router-dom";
import { Forside } from "../Pages/Forside/Forside";
import { ForestillingerEvents } from "../Pages/ForestillingerEvents/ForestillingerEvents";
import { ForestillingEventsDetaljer } from "../Pages/ForestillingerEvents/ForestillingEventsDetaljer";
import { Skuespillere } from "../Pages/Skuespillere/Skuespillere";
import { Login } from "../Pages/Login/Login";
import { NotFound } from "../Pages/NotFound/NotFound";
import { SkuespillerDetails } from "../Pages/Skuespillere/SkuespillerDetails";
import { MinSide } from "../Pages/MinSide/MinSide";
import { AnmeldelseEditForm } from "../Components/AnmeldelserFormular/AnmedelseEditForm";

//alle routes på siden
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Forside />}></Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>

      {/* FORESTILLINGER OG EVENTS ROUTES */}
      <Route path="/forestillingerevents">
        <Route index element={<ForestillingerEvents />}></Route>
        <Route
          path=":forestilling_id"
          element={<ForestillingEventsDetaljer />}
        ></Route>
      </Route>

      {/* SKUESPILLERE ROUTES */}
      <Route path="/skuespillere">
        <Route index element={<Skuespillere />}></Route>
        <Route path=":skuespiller_id" element={<SkuespillerDetails />}></Route>
      </Route>

      <Route path="/login" element={<Login />}></Route>
      <Route path="/minside" element={<MinSide />}></Route>
      <Route
        path="/anmedelser/edit/:anmedelse_id"
        element={<AnmeldelseEditForm />}
      ></Route>
    </Routes>
  );
};
