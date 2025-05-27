import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CardForm } from './CardForm'
import * as api from '@/api'
import { CardFormSchema } from './CardForm.schema'

vi.mock('@/api')

vi.mock('react-toastify', () => ({
  toast: { error: vi.fn() }
}))

describe('CardForm component', () => {
  const onSubmit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('validates with correct input and lowercase plate', () => {
    const input = {
      plate: 'М777ММ77',
      image: 'image_url'
    }
    const result = CardFormSchema.parse(input)
    expect(result.plate).toBe('М777ММ77'.toLowerCase())
    expect(result.image).toBe('image_url')
  })

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
    vi.mocked(api.uploadImage).mockResolvedValueOnce({ id: 'mock-id', url: 'http://mock-url.com' })

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
      expect(api.uploadImage).toHaveBeenCalledWith(file)
    })
  })

  it('fetches image when defaultValues.image is missing', async () => {
    vi.mocked(api.getImage).mockResolvedValueOnce({ id: 'mock-id', url: 'http://mock-url.com' })

    render(
      <CardForm defaultValues={{ image: 'mock-id' }} onSubmit={onSubmit}>
        <CardForm.Body />
        <CardForm.Actions />
      </CardForm>
    )

    await waitFor(() => {
      expect(api.getImage).toHaveBeenCalledWith('mock-id')
    })
  })
})
