import { cn } from '@/utils'
import { ButtonProps } from './Button.types'

export const Button = ({ variant = 'primary', type = 'button', ...props }: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        'min-w-22 cursor-pointer rounded px-4 py-2.5 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-15',
        {
          primary: 'bg-neutral-800 text-white hover:bg-neutral-900',
          destructive: 'bg-red-500 text-white hover:bg-red-600'
        }[variant]
      )}
      {...props}
    />
  )
}
