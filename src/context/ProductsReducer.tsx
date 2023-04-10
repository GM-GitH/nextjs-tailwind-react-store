import { IProduct, StateProps } from '../interfaces/interfaces'

export type ProductsAction =
  | {
      type: 'ADD_PRODUCT'
      payload: IProduct
    }
  | {
      type: 'UPDATE_PRODUCT'
      payload: {
        index: number
        image: string
        title: string
        category: string
        price: number
      }
    }

export function ProductsReducer(
  state: StateProps,
  action: ProductsAction
): { products: IProduct[] } {
  const updatedProducts = [...state.products]
  switch (action.type) {
  case 'ADD_PRODUCT':
    return {
      ...state,
      products: [...state.products, action.payload]
    }
  case 'UPDATE_PRODUCT':
    updatedProducts[action.payload.index] = {
      ...updatedProducts[action.payload.index],
      image: action.payload.image,
      title: action.payload.title,
      category: action.payload.category,
      price: action.payload.price
    }
    return {
      ...state,
      products: updatedProducts
    }
  default:
    return state
  }
}
