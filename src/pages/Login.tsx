import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../store/AuthContext";

import LoginForm from "../components/user/LoginForm";
import PageNav from "../components/layout/PageNav";

import styles from "./Login.module.css";

export default function Login() {
  const { isAuth } = useAuthContext();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (isAuth) {
        navigate("/app", { replace: true });
      }
    },
    [navigate, isAuth]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <LoginForm />
    </main>
  );
}
