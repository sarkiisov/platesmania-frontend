import { Card } from '@/types'
import { api } from '@/utils'

export const galleyPageLoader = async () => {
  return (await api('/gallery').then(({ data }) => data)) as Card[]
}
