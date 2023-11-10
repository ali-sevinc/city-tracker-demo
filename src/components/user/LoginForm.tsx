import { useState, FormEvent } from "react";
import { useAuthContext } from "../../store/AuthContext";

import Button from "../ui/Button";

import styles from "../../pages/Login.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123qwe");
  const { handleLogin, error } = useAuthContext();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email || !password) return;
    const userData = { email, password };
    handleLogin(userData);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div className={styles.actions}>
        <Button style="primary" type="submit">
          Login
        </Button>
        {error && <p>{error}</p>}
      </div>
    </form>
  );
}
