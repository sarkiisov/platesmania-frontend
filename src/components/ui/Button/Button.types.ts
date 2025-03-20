export type ButtonVariant = 'primary' | 'destructive'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}
