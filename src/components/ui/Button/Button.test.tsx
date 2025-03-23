import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button component', () => {
  it('renders button with correct text', () => {
    render(<Button>Click me</Button>)
    const buttonElement = screen.getByText(/Click me/i)
    expect(buttonElement).toBeInTheDocument()
  })

  it('renders disabled button', () => {
    render(<Button disabled>Click Me</Button>)
    const button = screen.getByText('Click Me')
    expect(button).toBeDisabled()
  })

  it('triggers onClick event', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click Me</Button>)
    const button = screen.getByText('Click Me')
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not trigger onClick event when disabled', () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Click Me
      </Button>
    )
    const button = screen.getByText('Click Me')
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders button with correct type', () => {
    render(<Button type="submit">Click Me</Button>)
    const button = screen.getByText('Click Me')
    expect(button).toHaveAttribute('type', 'submit')
  })
})
