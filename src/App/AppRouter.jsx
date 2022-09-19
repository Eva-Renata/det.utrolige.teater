import { Route, Routes } from "react-router-dom";
import { Forside } from "../Pages/Forside/Forside";
import { Produkter } from "../Pages/Produkter/Produkter";
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
      <Route path="/produkter" element={<Produkter />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};
