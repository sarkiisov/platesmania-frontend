import { render, screen } from '@testing-library/react'
import { Card } from './Card'
import dayjs from 'dayjs'

vi.mock('../Plate', () => ({
  Plate: ({ plate }: { plate: string }) => <div data-testid="plate">{plate}</div>
}))

describe('Card component', () => {
  const mockCard = {
    plate: 'м777мм77',
    image: { id: 'image', url: 'https://example.com/image.jpg' },
    createdAt: '2025-03-23T12:00:00Z'
  }

  it('renders the Plate component with the correct plate number', () => {
    render(<Card {...mockCard} />)

    const plateElement = screen.getByTestId('plate')
    expect(plateElement).toBeInTheDocument()
    expect(plateElement).toHaveTextContent(mockCard.plate)
  })

  it('renders the card image with correct src', () => {
    render(<Card {...mockCard} />)
    const imageElement = screen.getByRole('img')
    expect(imageElement).toHaveAttribute('src', mockCard.image.url)
  })

  it('renders the formatted createdAt date', () => {
    render(<Card {...mockCard} />)

    const formattedDate = dayjs(mockCard.createdAt).format('YYYY-MM-DD HH:mm:ss')
    expect(screen.getByText(formattedDate)).toBeInTheDocument()
  })
})
