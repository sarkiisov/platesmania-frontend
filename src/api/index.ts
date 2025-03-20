import { Card, CardCreateInput, CardImage, CardUpdateInput } from '@/types'
import { api } from '@/utils'

export const getCards = async (search: string | null) => {
  return await api<Card[]>(`/gallery`, { params: { search } }).then(({ data }) => data)
}

export const getCard = async (id: string) => {
  return await api<Card>(`/gallery/${id}`).then(({ data }) => data)
}

export const createCard = async (data: CardCreateInput) => {
  return await api.post<Card>(`/gallery`, { data }).then(({ data }) => data)
}

export const updateCard = async (id: string, data: CardUpdateInput) => {
  return await api.patch<Card>(`/gallery/${id}`, { data }).then(({ data }) => data)
}

export const deleteCard = async (id: string) => {
  return await api.delete(`/gallery/${id}}`)
}

export const fetchImage = async (id: string) => {
  return await api<CardImage>(`/images/${id}`).then(({ data }) => data)
}

export const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return await api
    .post<CardImage>('/image-upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(({ data }) => data)
}
