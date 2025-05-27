import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardFormData, CardFormProps } from './CardForm.types'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ErrorMessage } from '@hookform/error-message'
import { CardFormSchema } from './CardForm.schema'
import { Button } from '@/components/ui'
import { uploadImage, getImage } from '@/api'
import { toast } from 'react-toastify'

export const CardForm = ({ defaultValues, onSubmit, children }: CardFormProps) => {
  const form = useForm<CardFormData>({
    defaultValues: defaultValues ?? { plate: '', image: '' },
    resolver: zodResolver(CardFormSchema)
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} data-testid="card-form">
        {children}
      </form>
    </FormProvider>
  )
}

const CardFormBody = () => {
  const {
    register,
    setValue,
    formState: { errors, defaultValues }
  } = useFormContext<CardFormData>()

  const [imageUrl, setImageUrl] = useState<string>()

  const handleImageDrop = useCallback(
    async ([file]: File[]) => {
      const { id, url } = await uploadImage(file).catch((err) => {
        toast.error('Ошибка при загрузке изображения')
        throw err
      })

      setValue('image', id, { shouldDirty: true, shouldValidate: true })
      setImageUrl(new URL(url, import.meta.env.VITE_BACKEND_API_URL).href)
    },
    [setValue]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageDrop,
    multiple: false,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] }
  })

  useEffect(() => {
    if (!defaultValues?.image) return

    getImage(defaultValues.image).then(({ url }) =>
      setImageUrl(new URL(url, import.meta.env.VITE_BACKEND_API_URL).href)
    )
  }, [defaultValues?.image])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-0.5">
        <label htmlFor="plate" className="block text-sm font-semibold">
          Номер
        </label>
        <input
          id="plate"
          placeholder="м777мм77"
          className="w-full rounded border border-neutral-300 p-2 outline-0"
          {...register('plate')}
        />
        <div className="text-sm text-red-500">
          <ErrorMessage errors={errors} name="plate" />
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="image" className="block text-sm font-semibold">
          Изображение
        </label>
        <div
          {...getRootProps()}
          className="cursor-pointer rounded border-2 border-dashed border-neutral-300 p-4 transition-colors hover:bg-neutral-100"
        >
          <input type="hidden" {...register('image')} />
          <input {...getInputProps()} id="image" />
          <div className="flex h-64 items-center justify-center">
            {imageUrl ? (
              <img className="mx-auto h-full w-auto object-contain" src={imageUrl} />
            ) : (
              <p className="text-sm font-medium text-neutral-500">
                Переместите или загрузите изображение
              </p>
            )}
          </div>
        </div>
        <div className="text-sm text-red-500">
          <ErrorMessage errors={errors} name="image" />
        </div>
      </div>
    </div>
  )
}

const CardFormActions = () => {
  const {
    formState: { isDirty, isSubmitting }
  } = useFormContext<CardFormData>()

  return (
    <Button disabled={!isDirty || isSubmitting} type="submit">
      Сохранить
    </Button>
  )
}

CardForm.Body = CardFormBody
CardForm.Actions = CardFormActions
