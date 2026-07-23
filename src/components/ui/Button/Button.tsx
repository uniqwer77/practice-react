import type { ComponentProps } from "react";
import styles from './Button.module.css';

interface ButtonProps extends ComponentProps<"button"> {
    variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({ children, className = '', variant = 'primary', ...props }: ButtonProps) => {
    const variantClass = styles[variant] || '';

    const buttonClasses = `${styles.button} ${variantClass} ${className}`.trim();

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};