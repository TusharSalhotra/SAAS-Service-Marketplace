import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  icon?: ReactNode;
};

export default function Button({ className, variant = 'primary', icon, children, ...props }: ButtonProps) {
  return (
    <button className={cx('button', `button-${variant}`, className)} {...props}>
      {icon}
      {children}
    </button>
  );
}
