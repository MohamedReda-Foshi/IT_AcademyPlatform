/*
import React from 'react';
import DataTable from '../../components/DataTable';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data?: T[];
  title?: string;
  columns?: Column<T>[];
  emptyMessage?: string;
}

  // If no columns are provided, automatically generate them from the first item
  interface Column<T> {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
  }

  interface DataTableProps<T> {
    data?: T[];
    title?: string;
    columns?: Column<T>[];
    emptyMessage?: string;
  }

  const DataTable = <T extends Record<string, any>>({ 
    data = [], 
    title = "Data Table",
    columns = [],
    emptyMessage = "No data available"
  }: DataTableProps<T>) => {
    // Early return if no data and no columns specified
    if (data.length === 0 && columns.length === 0) {
      return (
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <div className="bg-white p-4 border border-gray-200 rounded">
            <p className="text-gray-500">{emptyMessage}</p>
          </div>
        </div>
      );
    }

    const tableColumns: Column<T>[] = columns.length > 0 
      ? columns 
      : data.length > 0 
        ? Object.keys(data[0]).map(key => ({
            key,
            header: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
            render: (item: T) => item[key]
          }))
        : [];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {tableColumns.map((column, index) => (
                <th 
                  key={index} 
                  className="py-2 px-4 border-b border-gray-200 text-left font-semibold text-gray-600"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  {tableColumns.map((column, colIndex) => (
                    <td key={colIndex} className="py-2 px-4 border-b border-gray-200">
                      {column.render ? column.render(item) : item[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={tableColumns.length} 
                  className="py-4 px-4 text-center text-gray-500 border-b border-gray-200"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DataTable;
*/