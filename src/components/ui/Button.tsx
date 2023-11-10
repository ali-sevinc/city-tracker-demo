import { ReactNode } from "react";
import styles from "./Button.module.css";

interface PropsType {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  style: "primary" | "back" | "position";
  onClick?: () => void;
}
export default function Button({ type, style, children, onClick }: PropsType) {
  if (onClick)
    return (
      <button
        onClick={onClick}
        type={type}
        className={`${styles.btn} ${styles[style]}`}
      >
        {children}
      </button>
    );
  return (
    <button type={type} className={`${styles.btn} ${styles[style]}`}>
      {children}
    </button>
  );
}
