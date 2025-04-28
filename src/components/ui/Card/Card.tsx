import { CardProps } from './Card.types'
import { Plate } from '../Plate'
import dayjs from 'dayjs'
import { cn } from '@/utils'

export const Card = ({ plate, image, createdAt, className, ...props }: CardProps) => {
  const imageUrl = new URL(image.url, import.meta.env.VITE_BACKEND_API_URL)

  return (
    <div
      className={cn(
        'overflow-hidden rounded-md border border-gray-200 shadow-xs transition-shadow hover:shadow-md',
        className
      )}
      {...props}
    >
      <img src={imageUrl.href} className="aspect-3/2 w-full object-cover" />
      <div className="flex flex-col gap-4 p-3">
        <Plate plate={plate} className="m-auto cursor-pointer" />
        <div className="text-right text-sm text-gray-400">
          {dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      </div>
    </div>
  )
}
