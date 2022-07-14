import { NextPage } from 'next'
import { useState } from 'react'
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table'  // new

type Props = {
  preGlobalFilteredRows: any,
  globalFilter: any,
  setGlobalFilter: any
}

const GlobalFilter: NextPage<Props> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <>
      <div className="form-control sm:hidden">
        <input value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }} type="text" placeholder="search" className=" input input-bordered input-primary w-full max-w-xs" />
      </div>
      <div className="form-control hidden sm:block">
        <input type="text" placeholder="search" className="sm:hidden input input-bordered input-primary w-full max-w-xs" />
        <label className="input-group">
          <span className="bg-primary text-white">Search</span>
          <input value={value || ""}
            onChange={e => {
              setValue(e.target.value);
              onChange(e.target.value);
            }} type="text" placeholder="search..." className="input input-primary input-bordered w-full max-w-xs" />
        </label>
      </div>
    </>
  )
}

export default GlobalFilter;