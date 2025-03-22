import { Button } from '@/components/ui'
import { useState } from 'react'
import { Link, Outlet, useSearchParams } from 'react-router'
import { useDebouncedCallback } from 'use-debounce'

export const GalleryLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') ?? '')

  const setSearchQuery = useDebouncedCallback((value) => {
    if (value) {
      const nextSearchParams = new URLSearchParams(searchParams)
      nextSearchParams.set('search', value)
      setSearchParams(nextSearchParams)
    } else {
      setSearchParams(new URLSearchParams())
    }
  }, 1000)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value
    setSearch(search)
    setSearchQuery(search)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 py-4">
      <div className="flex justify-between py-4">
        <input
          value={search}
          onChange={handleInputChange}
          className="min-w-96 rounded border px-2 text-sm outline-0"
          placeholder="Поиск по номеру..."
        />
        <Link to="/gallery/add">
          <Button>Добавить карточку</Button>
        </Link>
      </div>
      <Outlet />
    </div>
  )
}
