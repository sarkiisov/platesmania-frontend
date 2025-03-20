import { getCards } from '@/api'
import { LoaderFunctionArgs } from 'react-router'

export const galleyPageLoader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url)

  const search = searchParams.get('search') ?? null

  return await getCards(search)
}
