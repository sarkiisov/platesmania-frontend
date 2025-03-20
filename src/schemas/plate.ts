import { z } from 'zod'

export const PlateSchema = z
  .string()
  .regex(/^[АВЕКМНОРСТУХ]{1}[0-9]{3}[АВЕКМНОРСТУХ]{2}[0-9]{2,3}$/gi, 'Неправильный формат номера')
