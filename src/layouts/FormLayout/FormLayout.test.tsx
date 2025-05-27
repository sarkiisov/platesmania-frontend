import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { FormLayout } from './FormLayout'

describe('FormLayout', () => {
  it('renders navigation link and outlet content', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <FormLayout />,
          children: [
            {
              path: 'test',
              element: <div data-testid="child-content">Test Content</div>
            }
          ]
        }
      ],
      {
        initialEntries: ['/test']
      }
    )

    render(<RouterProvider router={router} />)

    const backLink = screen.getByRole('link', { name: /Вернуться к галерее/i })

    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/gallery')

    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  // it('applies correct layout classes', async () => {
  //   const router = createMemoryRouter(
  //     [
  //       {
  //         path: '/',
  //         element: <FormLayout />,
  //         children: [{ path: 'test', element: <div /> }]
  //       }
  //     ],
  //     { initialEntries: ['/test'] }
  //   )

  //   const { container } = render(<RouterProvider router={router} />)

  //   // Verify main container classes
  //   const mainDiv = container.firstChild as HTMLElement
  //   expect(mainDiv).toHaveClass('mx-auto', 'max-w-3xl', 'flex', 'flex-col', 'gap-4', 'py-4')

  //   // Verify link container classes
  //   const linkContainer = screen.getByRole('link').parentElement
  //   expect(linkContainer).toHaveClass('py-4')
  // })
})
