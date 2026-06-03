import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'dark';

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, 'className'> {
  variant?: Variant;
  size?: 'md' | 'sm';
  className?: string;
  children: ReactNode;
}

/** Link styled as a design-system button (.btn). */
const ButtonLink = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonLinkProps) => {
  return (
    <Link
      className={cn('btn', `btn-${variant}`, size === 'sm' && 'btn-sm', className)}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
