import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CardForm } from './CardForm'
import { uploadImage } from '@/api'

vi.mock('@/api', () => ({
  uploadImage: vi.fn().mockResolvedValue({ id: 'mock-id', url: 'http://mock-url.com' }),
  getImage: vi.fn().mockResolvedValue({ url: 'http://mock-url.com' })
}))

describe('CardForm component', () => {
  const onSubmit = vi.fn()

  it('renders the form correctly', () => {
    render(
      <CardForm onSubmit={onSubmit}>
        <CardForm.Body />
        <CardForm.Actions />
      </CardForm>
    )

    expect(screen.getByLabelText(/Номер/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Изображение/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Сохранить/i })).toBeDisabled()
  })

  it('validates plate field with the correct format', async () => {
    render(
      <CardForm onSubmit={onSubmit}>
        <CardForm.Body />
        <CardForm.Actions />
      </CardForm>
    )

    const plateInput = screen.getByLabelText(/Номер/i)
    userEvent.type(plateInput, '123ABC')

    const submitButton = screen.getByRole('button', { name: /Сохранить/i })
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Неправильный формат номера/i)).toBeInTheDocument()
    })
  })

  it('validates image field for file presense', async () => {
    render(
      <CardForm onSubmit={onSubmit}>
        <CardForm.Body />
        <CardForm.Actions />
      </CardForm>
    )

    const submitButton = screen.getByRole('button', { name: /Сохранить/i })
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Изображение обязательно для загрузки/i)).toBeInTheDocument()
    })
  })

  it('handles image upload correctly', async () => {
    render(
      <CardForm onSubmit={onSubmit}>
        <CardForm.Body />
        <CardForm.Actions />
      </CardForm>
    )

    const file = new File(['image content'], 'test-image.jpg', { type: 'image/jpeg' })
    const input = screen
      .getByLabelText(/Изображение/i)
      .closest('div')
      ?.querySelector('input[type=file]') as HTMLElement

    if (!input) throw new Error('File input not found')

    await userEvent.upload(input, file)

    await waitFor(() => {
      expect(uploadImage).toHaveBeenCalledWith(file)
    })
  })
})
