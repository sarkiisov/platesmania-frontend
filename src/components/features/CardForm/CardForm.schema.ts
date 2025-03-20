import { PlateSchema } from '@/schemas'
import { z } from 'zod'

export const CardFormSchema = z
  .object({
    plate: PlateSchema,
    image: z.string().min(1, 'Изображение обязательно для загрузки')
  })
  .transform(({ plate, ...rest }) => ({
    plate: plate.toLowerCase(),
    ...rest
  }))
