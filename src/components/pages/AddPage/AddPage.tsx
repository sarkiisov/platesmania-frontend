import { CardForm } from '@/components/features'

export const AddPage = () => {
  return (
    <CardForm onSubmit={console.log}>
      <CardForm.Body />
      <div className="mt-4 flex justify-end">
        <CardForm.Actions />
      </div>
    </CardForm>
  )
}
