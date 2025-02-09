import { ButtonProps } from "@/types/button";

import styles from "./Button.module.scss";

export default function Button({
  children,
  type,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
