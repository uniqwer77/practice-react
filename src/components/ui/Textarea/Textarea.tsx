import { type ComponentProps, forwardRef } from "react";
import styles from './Textarea.module.css';

interface TextareaProps extends ComponentProps<"textarea"> {
    error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <div className={styles.wrapper}>

        <textarea
          ref={ref}
          className={`${styles.input} ${error ? styles.invalid : ''} ${className}`}
          {...props}
        />

        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';