import { useState, useEffect } from 'react'
import { IProduct } from '../interfaces/interfaces'

type OrderType = 'title' | 'category' | 'price'
type SortOrderType = 'asc' | 'desc'

export const useProductsSorting = (products: IProduct[]) => {
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>(products)
  const [currentOrder, setCurrentOrder] = useState<OrderType>('title')
  const [sortOrder, setSortOrder] = useState<SortOrderType>('asc')

  useEffect(() => {
    const sortFunction = (a: IProduct, b: IProduct) => {
      const x =
        currentOrder === 'title'
          ? a.title.toLowerCase()
          : currentOrder === 'category'
            ? a.category.toLowerCase()
            : a.price
      const y =
        currentOrder === 'title'
          ? b.title.toLowerCase()
          : currentOrder === 'category'
            ? b.category.toLowerCase()
            : b.price

      if (sortOrder === 'asc') {
        return x < y ? -1 : x > y ? 1 : 0
      } else {
        return x > y ? -1 : x < y ? 1 : 0
      }
    }

    const sorted = [...products].sort(sortFunction)
    setSortedProducts(sorted)
  }, [products, currentOrder, sortOrder])

  const sortProducts = (type: OrderType) => {
    if (type === currentOrder) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setCurrentOrder(type)
      setSortOrder('asc')
    }
  }

  return {
    sortedProducts,
    sortProducts,
    currentOrder,
    sortOrder
  }
}
