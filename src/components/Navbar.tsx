import { Link } from 'react-router-dom'
import React from 'react'

export function Navbar(): JSX.Element {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <span className="font-semibold text-xl tracking-tight cursor-pointer">
            Premium Store
          </span>
        </Link>
      </div>
      <div className="flex items-center justify-end sm:flex-grow-0">
        <div className="text-sm">
          <Link to="/">
            <span className="block inline-block  text-white hover:text-gray-400 mr-4 cursor-pointer">
              Clientes
            </span>
          </Link>
          <Link to="/proveedores">
            <span className="block inline-block text-white hover:text-gray-400 mr-4 cursor-pointer">
              Proveedores
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}