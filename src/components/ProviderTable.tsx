import React, { useMemo } from 'react'
import {
  useTable,
  useSortBy,
  usePagination,
  TableInstance,
  UsePaginationInstanceProps,
  Row,
  TableState
} from 'react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import { IProduct } from '../interfaces/interfaces'
import useProducts from '../hooks/useProducts'

export interface IProductTableInstance<
  D extends Record<string, unknown> = IProduct
> extends TableInstance<D>,
    UsePaginationInstanceProps<D> {
  page: Row<D>[]
  pageIndex: number
  canNextPage: boolean
  canPreviousPage: boolean
  nextPage: () => void
  previousPage: () => void
}
export interface ITableState<D extends Record<string, unknown>>
  extends TableState<D> {
  pageIndex: number
}
export interface IProductTableProps {
  products: IProduct[]
}

export function ProviderTable() {
  const products = useProducts()

  const columns = useMemo(
    () => [
      {
        Header: 'Título',
        accessor: 'title'
      },
      {
        Header: 'Categoría',
        accessor: 'category'
      },
      {
        Header: 'Precio',
        accessor: 'price',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ value }: { value: any }) => (
          <span>{parseFloat(value).toFixed(2)}</span>
        )
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex }
  } = useTable<IProduct>(
    {
      columns,
      data: products,
      initialState: { pageIndex: 0 }
    },
    useSortBy,
    usePagination
  ) as IProductTableInstance

  return (
    <TableContainer
      component={Paper}
      className="flex flex-wrap justify-center h-screen"
    >
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, index) => (
            <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                  className="font-bold text-xl bg-gray-50"
                >
                  <label
                    className="font-bold cursor-pointer">
                    {column.render('Header')}
                  </label>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className="py-4 flex items-center justify-between">
        <button
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 font-medium disabled:bg-gray-300 disabled:text-gray-500"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          &lt;
        </button>

        <span className="mx-4">
          Página
          <strong className="mx-1">
            {pageIndex + 1} de {Math.ceil(products.length / page.length)}
          </strong>
        </span>
        <button
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 font-medium disabled:bg-gray-300 disabled:text-gray-500"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          &gt;
        </button>
      </div>
    </TableContainer>
  )
}
