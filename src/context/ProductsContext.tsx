import { IProduct, StateProps } from '../interfaces/interfaces'
import React, { createContext, useReducer } from 'react'
import { ProductsReducer } from './ProductsReducer'

export interface IContextProps {
  products: IProduct[]
  setProducts: (
    category: string,
    id: number,
    image: string,
    price: number,
    title: string
  ) => void
}
interface IChildren {
  children: React.ReactNode
}

const initialState: StateProps = {
  products: []
}

export const ProductsContext = createContext<IContextProps>({
  products: [],
  // This is a false positive, as the functions are being set in the ContextProvider.
  /* eslint-disable @typescript-eslint/no-empty-function */
  setProducts: () => {}
})

export const ContextProvider: React.FC<IChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, initialState)

  const setProducts = (
    category: string,
    id: number,
    image: string,
    price: number,
    title: string
  ): void => {
    const existingProductIndex = state.products.findIndex(
      (product) => product.id === id
    )

    if (existingProductIndex !== -1) {
      // If the product already exists in the state, update its values
      dispatch({
        type: 'UPDATE_PRODUCT',
        payload: {
          index: existingProductIndex,
          image,
          title,
          category,
          price
        }
      })
    } else {
      // If the product does not exist in the state, add it as a new object
      const product = {
        id,
        image,
        title,
        category,
        price
      }
      dispatch({
        type: 'ADD_PRODUCT',
        payload: product
      })
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        setProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
