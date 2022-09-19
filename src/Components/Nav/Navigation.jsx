import { NavLink } from "react-router-dom";
import "./Navigation.module.scss";

export const Navigation = () => {
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
          <NavLink to="/login">LOGIN</NavLink>
        </li>
      </ul>
    </nav>
  );
};
