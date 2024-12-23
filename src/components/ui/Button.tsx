import { cn } from '@/utils';
import { cva } from 'class-variance-authority';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

const buttonVariants = cva(
  'py-2 px-4 rounded-md font-semibold hover:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-blue-100 text-black',
        secondary: 'bg-grayscale text-white',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export default function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button {...props} className={cn(buttonVariants({ variant }), className)} />
  );
}
