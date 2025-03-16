import { cn } from '@/utils/cn'
import { PlateProps } from './Plate.types'
import { parsePlate } from '@/utils'

export const Plate = ({ plate, className, ...props }: PlateProps) => {
  const { prefix, number, postfix, region } = parsePlate(plate)

  return (
    <div
      className={cn(
        'plate gap text-md relative flex w-fit scale-110 items-stretch rounded-sm border-2 bg-black select-none',
        className
      )}
      {...props}
    >
      <div className="relative rounded-xs rounded-r-xs border-r-1 border-black bg-white pr-1 pl-1.5 text-2xl leading-4 text-black">
        <div className="mt-2 flex items-center gap-0.5">
          <span>{prefix}</span>
          <span>{number}</span>
          <span>{postfix}</span>
        </div>
      </div>
      <div className="flex h-auto flex-col items-center rounded-xs rounded-l-xs border-l-1 border-black bg-white py-0.5 pr-1.5 pl-1 text-3xl text-black">
        <div className="text-lg leading-4 text-black">{region}</div>
        <div className="flex items-center gap-0.5">
          <span className="text-xs leading-2 font-medium">RUS</span>
          <div className="h-2 w-3 border border-black">
            <div className="h-1/3 bg-white"></div>
            <div className="h-1/3 bg-blue-500"></div>
            <div className="h-1/3 bg-red-500"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
