export type CardImage = {
  id: string
  url: string
}

export type Card = {
  id: string
  plate: string
  image: CardImage
  createdAt: string
}

export type CardCreateInput = {
  plate: string
  image: string
}

export type CardUpdateInput = {
  plate: string
  image: string
}
