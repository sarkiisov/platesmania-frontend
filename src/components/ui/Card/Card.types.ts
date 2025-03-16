import { Card } from '@/types'

export type CardProps = React.HTMLAttributes<HTMLDivElement> & Omit<Card, 'id'>
