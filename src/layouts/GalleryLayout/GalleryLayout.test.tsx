/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { GalleryLayout } from './GalleryLayout'
import { Mock, vi } from 'vitest'
import { useSearchParams } from 'react-router'
import { DebouncedState, useDebouncedCallback } from 'use-debounce'

vi.mock('react-router', async () => ({
  ...(await vi.importActual('react-router')),
  useSearchParams: vi.fn(),
  Link: vi.fn().mockImplementation(({ children, ...props }) => (
    <a href={props.to} {...props}>
      {children}
    </a>
  )),
  Outlet: vi.fn().mockImplementation(() => <div data-testid="outlet" />)
}))

vi.mock('use-debounce', () => ({
  useDebouncedCallback: vi.fn()
}))

describe('GalleryLayout', () => {
  let setSearchParams: Mock

  beforeEach(() => {
    setSearchParams = vi.fn()
    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams(), setSearchParams])
  })

  it('updates search input and calls debounced setSearchQuery', () => {
    const mockDebounced = vi.fn()
    vi.mocked(useDebouncedCallback).mockImplementationOnce(
      () => mockDebounced as unknown as DebouncedState<any>
    )

    render(<GalleryLayout />)

    const input = screen.getByPlaceholderText('Поиск по номеру...')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(input).toHaveValue('test')
    expect(mockDebounced).toHaveBeenCalledWith('test')
  })

  it('calls setSearchParams with new search value when input is not empty', async () => {
    vi.mocked(useDebouncedCallback).mockImplementationOnce(
      ((fn: any) => (value: string) => fn(value)) as unknown as () => DebouncedState<any>
    )
    render(<GalleryLayout />)
    const input = screen.getByPlaceholderText('Поиск по номеру...')
    fireEvent.change(input, { target: { value: 'test' } })

    await waitFor(() => {
      expect(setSearchParams).toHaveBeenCalledWith(new URLSearchParams({ search: 'test' }))
    })
  })

  it('renders Outlet', () => {
    vi.mocked(useSearchParams).mockReturnValue([new URLSearchParams(), vi.fn()])

    render(<GalleryLayout />)

    expect(screen.getByTestId('outlet')).toBeInTheDocument()
  })

  it('initializes search from URL params', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ search: 'м777мм77' }),
      vi.fn()
    ])

    render(<GalleryLayout />)

    const input = screen.getByPlaceholderText('Поиск по номеру...')
    expect(input).toHaveValue('м777мм77')
  })
})
