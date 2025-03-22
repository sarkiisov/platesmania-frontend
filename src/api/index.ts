import { Card, CardCreateInput, CardImage, CardUpdateInput } from '@/types'
import { api } from '@/utils'

const endpoints = {
  cards: 'gallery',
  card: (id: string) => `gallery/${id}`,
  images: 'images',
  image: (id: string) => `images/${id}`,
  imageUpload: 'image-upload'
}

export const getCards = async (search: string | null) => {
  return await api<Card[]>(endpoints.cards, { params: { search } }).then(({ data }) => data)
}

export const getCard = async (id: string) => {
  return await api<Card>(endpoints.card(id)).then(({ data }) => data)
}

export const createCard = async (data: CardCreateInput) => {
  return await api.post<Card>(endpoints.cards, { data }).then(({ data }) => data)
}

export const updateCard = async (id: string, data: CardUpdateInput) => {
  return await api.patch<Card>(endpoints.card(id), { data }).then(({ data }) => data)
}

export const deleteCard = async (id: string) => {
  return await api.delete(endpoints.card(id))
}

export const getImage = async (id: string) => {
  return await api<CardImage>(endpoints.image(id)).then(({ data }) => data)
}

export const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return await api
    .post<CardImage>(endpoints.imageUpload, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(({ data }) => data)
}
