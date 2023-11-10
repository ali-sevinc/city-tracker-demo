import { useAuthContext } from "../../store/AuthContext";
import styles from "./User.module.css";

function User() {
  const { user, handleLogout } = useAuthContext();

  return (
    <div className={styles.user}>
      <img src={user?.avatar} alt={user?.name} />
      <span>Welcome, {user?.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default User;
