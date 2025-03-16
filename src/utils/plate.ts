export const parsePlate = (plate: string) => {
  const prefix = plate[0].toUpperCase()
  const number = parseInt(plate.slice(1, 1 + 3))
  const postfix = plate.slice(4, 4 + 2).toUpperCase()
  const region = plate.slice(6)

  return { prefix, number, postfix, region }
}
