import { Card } from '@/components/ui'
import { Link, useLoaderData } from 'react-router'
import { galleyPageLoader } from './GalleryPage.loader'

export const GalleryPage = () => {
  const cards = useLoaderData() as Awaited<ReturnType<typeof galleyPageLoader>>

  return (
    <>
      {cards.length ? (
        <div className="grid grid-cols-2 gap-4">
          {cards.map((card) => (
            <Link key={card.id} to={`/gallery/${card.id}/edit`}>
              <Card key={card.id} {...card} />
            </Link>
          ))}
        </div>
      ) : (
        <span className="my-8 text-center text-sm text-gray-500">Ничего не найдено</span>
      )}
    </>
  )
}
