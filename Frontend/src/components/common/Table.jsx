import React from "react";

export const Table = ({
  columns = [],
  data = [],
  className = "",
  hoverable = true,
  striped = false,
  ...props
}) => {
  return (
    <div
      className={`w-full overflow-x-auto rounded-3xl border border-white/10 bg-[#0d0d14]/80 backdrop-blur-2xl shadow-2xl ${className}`}
    >
      <table className="w-full text-left border-collapse" {...props}>
        <thead className="bg-white/[0.03] backdrop-blur-md sticky top-0 z-10">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-white/10"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={`
                  transition-colors duration-200
                  ${hoverable ? "hover:bg-white/[0.04]" : ""}
                  ${striped && rowIdx % 2 !== 0 ? "bg-white/[0.02]" : "bg-transparent"}
                `}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-6 py-4 text-xs font-medium text-gray-200"
                  >
                    {col.render
                      ? col.render(row[col.accessor], rowIdx, row)
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-xs text-gray-400 italic bg-transparent"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export const DataTable = ({
  columns = [],
  data = [],
  searchQuery = '',
  className = ''
}) => {
  const filteredData = data.filter((row) => {
    if (!searchQuery.trim()) return true;
    const searchLower = searchQuery.toLowerCase();
    return Object.values(row).some(
      (val) => val && String(val).toLowerCase().includes(searchLower)
    );
  });

  return (
    <Table
      columns={columns}
      data={filteredData}
      className={className}
      hoverable
      striped
    />
  );
};

export default Table;
