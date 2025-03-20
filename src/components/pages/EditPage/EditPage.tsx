import { CardForm, CardFormData } from '@/components/features'
import { useLoaderData, useNavigate } from 'react-router'
import { editPageLoader } from './EditPage.loader'
import { DefaultValues } from 'react-hook-form'
import { Button } from '@/components/ui'
import { deleteCard, updateCard } from '@/api'

export const EditPage = () => {
  const card = useLoaderData() as Awaited<ReturnType<typeof editPageLoader>>

  const navigate = useNavigate()

  const defaultValues: DefaultValues<CardFormData> = {
    plate: card.plate,
    image: card.image.id
  }

  const handleFormSubmit = async (data: CardFormData) => {
    await updateCard(card.id, data)
    navigate('/gallery')
  }

  const handleDeleteCard = async (id: string) => {
    const confirmed = window.confirm('Вы действительно хотите удалить карточку?')
    if (!confirmed) return

    await deleteCard(id)
    navigate('/gallery')
  }

  return (
    <CardForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
      <CardForm.Body />
      <div className="mt-4 flex justify-between">
        <Button variant="destructive" onClick={() => handleDeleteCard(card.id)}>
          Удалить
        </Button>
        <CardForm.Actions />
      </div>
    </CardForm>
  )
}
