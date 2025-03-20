import { Button } from '@/components/ui'
import { Link, Outlet, useSearchParams } from 'react-router'

export const GalleryLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 py-4">
      <div className="flex justify-between">
        <input
          defaultValue={searchParams.get('search') ?? ''}
          onKeyUp={(event) => {
            if (event.key !== 'Enter') return
            const search = (event.target as HTMLInputElement).value

            if (search) {
              const nextSearchParams = new URLSearchParams(searchParams)
              nextSearchParams.set('search', (event.target as HTMLInputElement).value)
              setSearchParams(nextSearchParams)
            } else {
              setSearchParams(new URLSearchParams())
            }
          }}
          className="min-w-64 rounded border px-2 text-sm outline-0"
          placeholder="Поиск по номеру..."
        />
        <Link to="/gallery/add">
          <Button>Добавить</Button>
        </Link>
      </div>
      <Outlet />
    </div>
  )
}
