import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/AuthContext";

import Sidebar from "../components/layout/Sidebar";
import Map from "../components/city/Map";
import User from "../components/user/User";

import styles from "./AppLayout.module.css";
export default function AppLayout() {
  const { isAuth } = useAuthContext();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuth) {
        navigate("/login");
      }
    },
    [isAuth, navigate]
  );

  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
