import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../store/AuthContext";

import Logo from "../ui/Logo";
import Button from "../ui/Button";

import styles from "./PageNav.module.css";

export default function PageNav() {
  const { isAuth, handleLogout } = useAuthContext();
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          {!isAuth && (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          )}
          {isAuth && (
            <Button onClick={handleLogout} style="primary" type="button">
              Logout
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
}
