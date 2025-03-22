import { createCard } from '@/api'
import { CardForm, CardFormData } from '@/components/features'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export const AddPage = () => {
  const navigate = useNavigate()

  const handleFormSubmit = async (data: CardFormData) => {
    await createCard(data).catch((err) => {
      toast.error('Ошибка при создании карточки')
      throw err
    })

    toast.success(`Карточка создана`)

    navigate('/gallery')
  }

  return (
    <CardForm onSubmit={handleFormSubmit}>
      <CardForm.Body />
      <div className="mt-4 flex justify-end">
        <CardForm.Actions />
      </div>
    </CardForm>
  )
}
