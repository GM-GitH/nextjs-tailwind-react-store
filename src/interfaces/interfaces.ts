export interface IProduct {
  category: string
  id: number
  image: string
  [key: string]: unknown
  price: number
  title: string
}

export interface StateProps {
  products: IProduct[]
}