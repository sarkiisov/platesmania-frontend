import { render, screen } from '@testing-library/react'
import { Plate } from './Plate'
import { parsePlate } from '@/utils'

describe('Plate component', () => {
  const mockPlate = 'м777мм77'

  const mockPlateParts = parsePlate(mockPlate)

  it('renders the plate with correct segments', () => {
    render(<Plate plate={mockPlate} />)

    Object.values(mockPlateParts).forEach((part) => {
      expect(screen.getByText(part)).toBeInTheDocument()
    })
  })

  it('renders the Russian flag with the correct colors', () => {
    render(<Plate plate={mockPlate} />)

    const flagContainer = screen.getByRole('presentation')

    const flagColors = flagContainer.querySelectorAll('div')
    expect(flagColors).toHaveLength(3)

    expect(flagColors[0]).toHaveClass('bg-white')
    expect(flagColors[1]).toHaveClass('bg-blue-500')
    expect(flagColors[2]).toHaveClass('bg-red-500')
  })
})
