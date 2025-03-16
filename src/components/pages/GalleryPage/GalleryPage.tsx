import { Card } from '@/components/ui'
import { Link, useLoaderData } from 'react-router'
import { galleyPageLoader } from './GalleryPage.loader'

export const GalleryPage = () => {
  const cards = useLoaderData() as Awaited<ReturnType<typeof galleyPageLoader>>

  return (
    <>
      <div className="mx-auto grid w-3xl grid-cols-2 gap-5">
        {cards.map((card) => (
          <Link to={`/gallery/${card.id}/edit`}>
            <Card key={card.id} {...card} />
          </Link>
        ))}
      </div>
    </>
  )
}
