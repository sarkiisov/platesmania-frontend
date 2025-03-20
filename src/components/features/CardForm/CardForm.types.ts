import { z } from 'zod'
import { CardFormSchema } from './CardForm.schema'
import { DefaultValues, SubmitHandler } from 'react-hook-form'

export type CardFormData = z.infer<typeof CardFormSchema>

export type CardFormProps = {
  defaultValues?: DefaultValues<CardFormData>
  onSubmit: SubmitHandler<CardFormData>
  children: React.ReactNode
}
