import { NavLink } from "react-router-dom";
import "./Navigation.module.scss";
import { useAuth } from "../../App/Auth";

export const Navigation = () => {
  const { loginData } = useAuth();
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">FORSIDE</NavLink>
        </li>
        <li>
          <NavLink to="/forestillingerevents">FORESTILLINGER & EVENTS</NavLink>
        </li>
        <li>
          <NavLink to="/skuespillere">SKUESPILLERE</NavLink>
        </li>
        <li>
          {loginData ? (
            <NavLink to="/minside">MIN SIDE</NavLink>
          ) : (
            <NavLink to="/login">LOGIN</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};
