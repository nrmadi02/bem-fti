import { NextPage } from "next";
import { useMemo } from "react";

type Props = {
  column: any,
}

const SelectColumnFilter: NextPage<Props> = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {


  // @ts-ignore
  const options = useMemo(() => {
    const options = new Set();
    // @ts-ignore
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    // @ts-ignore
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      name={id}
      id={id}
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}