import { NextPage } from "next";
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { SortDownIcon, SortIcon, SortUpIcon } from "../../assets/icon/Icons";
import GlobalFilter from "./GlobalFilter";

type Props = {
  data: any
  columns: any
  menus: any
}

const Table: NextPage<Props> = ({ data, columns, menus }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter
  } =
    useTable({
      columns,
      data,
      initialState: {
        pageSize: 5,
        hiddenColumns: ['name', 'npm']
      }
    }, useFilters, useGlobalFilter, useSortBy, usePagination);


  return (
    <>
      <div className={`mt-5 flex flex-row justify-center ${!menus && 'md:items-end md:justify-end mb-5 '}`}>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      {menus}
      <div className="overflow-x-auto overflow-y-hidden rounded-lg">
        <table {...getTableProps()} border={1} className="table w-full text-[12px] static">
          <thead>
            {headerGroups.map((headerGroup, idx) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                {headerGroup.headers.map((column, idx) => (
                  <th className="group first:!relative" {...column.getHeaderProps(column.getSortByToggleProps())} key={idx}>
                    <div className="flex items-center justify-between">
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? <SortDownIcon className="w-4 h-4 text-gray-400" />
                            : <SortUpIcon className="w-4 h-4 text-gray-400" />
                          : (
                            <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                          )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.length == 0 && <tr>
              <td align="center" colSpan={columns.length}>
                <p>Data not found ...</p>
              </td>
            </tr>}
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell, idx) => {
                    return <td {...cell.getCellProps()} key={idx}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination mt-3">
        <div className="btn-group sm:hidden grid grid-cols-2">
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-outline">Previous</button>
          <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-outline">Next</button>
        </div>
        <div className="hidden sm:block">
          <div className="flex justify-between">
            <div className="flex gap-x-2 items-center">
              <span className="text-sm">
                Page <span className="font-medium">{state.pageIndex + 1}</span> of <span className="font-medium">{pageOptions.length}</span>
              </span>
              <select
                className="select select-primary"
                value={state.pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[5, 10, 20].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="btn-group">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="btn">«</button>
              <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn">{'<'}</button>
              <button onClick={() => nextPage()} disabled={!canNextPage} className="btn">{'>'}</button>
              <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="btn">»</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Table;