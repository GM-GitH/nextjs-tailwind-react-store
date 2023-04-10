import { IProduct } from '@/interfaces/interfaces'
import { useState, useEffect, useMemo } from 'react'

function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error))
  }, [])

  const memoizedProducts = useMemo(() => products, [products])

  return memoizedProducts
}

export default useProducts