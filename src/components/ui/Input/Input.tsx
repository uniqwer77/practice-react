import { type ComponentProps, forwardRef } from "react";
import styles from './Input.module.css';

interface InputProps extends ComponentProps<"input"> {
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <div className={styles.wrapper}>

        <input
          ref={ref}
          className={`${styles.input} ${error ? styles.invalid : ''} ${className}`}
          {...props}
        />

        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';