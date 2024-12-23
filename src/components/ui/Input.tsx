import { cn } from '@/utils';
import { cva } from 'class-variance-authority';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant: 'primary' | 'secondary';
};

const inputVariants = cva(
  'py-2 px-4 rounded-md font-semibold hover:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg text-black',
        secondary: 'bg-grayscale-700 text-black',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export default function Input({ className, variant, ...props }: InputProps) {
  return (
    <input {...props} className={cn(inputVariants({ variant }), className)} />
  );
}
