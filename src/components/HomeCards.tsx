import useProducts from '../hooks/useProducts'
import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../context/ProductsContext'
import { IProduct } from '../interfaces/interfaces'
import { orderBy } from 'lodash'

export function HomeCards() {
  const { setProducts } = useContext(ProductsContext)
  const products = useProducts()
  const [prevProducts, setPrevProducts] = useState<IProduct[]>([])
  const [orderByField, setOrderByField] = useState<'title' | 'category' | 'price'>('title')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    const newProducts = products.filter(
      (product) => !prevProducts.some((prev) => prev.id === product.id)
    )

    if (newProducts.length > 0) {
      newProducts.forEach((product) => {
        setProducts(product.category, product.id, product.image, product.price, product.title)
      })
    }

    setPrevProducts(products)
  }, [products, prevProducts])

  const handleSort = (field: 'title' | 'category' | 'price') => {
    if (orderByField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setOrderByField(field)
      setSortDirection('asc')
    }
  }

  const sortedProducts = orderBy(prevProducts, orderByField, sortDirection)

  return (
    <>
      <div className="flex justify-center space-x-4 p-4 bg-gray-100">
        <button className={orderByField === 'title' ? 'font-bold' : ''} onClick={() => handleSort('title')}>Ordenar por Título</button>
        <button className={orderByField === 'category' ? 'font-bold' : ''} onClick={() => handleSort('category')}>Ordenar por Categoría</button>
        <button className={orderByField === 'price' ? 'font-bold' : ''} onClick={() => handleSort('price')}>Ordenar por Precio</button>
      </div>
      <div className="flex flex-wrap justify-center p-4 bg-gray-100">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="max-w-sm rounded overflow-hidden shadow-lg mx-2 my-4 bg-white p-2"
          >
            <div className="w-60 h-60 relative mx-auto">
              <img
                src={product.image}
                alt={product.title}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="p-2 w-60">
              <h3 className="text-xl mb-2">{product.title}</h3>
              <p className="text-gray-700 text-base mb-2">{product.category}</p>
              <p className="text-gray-700 text-base font-bold mb-2">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}