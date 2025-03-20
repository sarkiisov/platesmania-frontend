import { getCard } from '@/api'
import { LoaderFunctionArgs } from 'react-router'

export const editPageLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) throw new Error('Id is required')

  return await getCard(params.id)
}
