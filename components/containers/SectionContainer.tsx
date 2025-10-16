import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
}

const SectionContainer: FC<SectionContainerProps> = ({ children, className }) => {
  return (
    <section
      className={cn(
        'container mx-auto flex w-full flex-col items-center gap-5 px-[clamp(1.25rem,_-0.114rem+6.82vw,_5rem)] py-[clamp(1.25rem,_0.795rem_+_2.27vw,_2.5rem)]',
        className,
      )}
    >
      {children}
    </section>
  );
};

export default SectionContainer;
