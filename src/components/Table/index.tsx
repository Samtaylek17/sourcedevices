import React, { useMemo, FC, useEffect } from 'react';
import { useTable, useSortBy, usePagination, useExpanded } from 'react-table';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { UserInterface } from '../../slices/userSlice';
import { ReactComponent as EmptyTableIcon } from '../../assets/icons/empty_table.svg';

interface TableProps {
  data: UserInterface[];
  columns: Record<string, unknown>[];
  viewData: any;
  pageCount: number;
  loading: boolean;
  isPaginated?: boolean;
  fetchData: any;
}

const Table: FC<TableProps> = ({
  columns,
  data,
  pageCount: controlledPageCount,
  loading,
  fetchData,
  viewData,
  isPaginated = true
}) => {
  const defaultColumn = useMemo(
    () => ({
      // minWidth: 20,
      // maxWidth: 115
    }),
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: 0,
        pageSize: 20,
        hiddenColumns: columns.filter((column) => !column.show).map((column) => column.id)
      },
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      pageCount: controlledPageCount
    },
    useSortBy,
    useExpanded,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize }
  } = tableInstance;

  const pageNumbers: number[] = [];

  for (let i: number = 1; i <= Math.ceil(pageOptions.length / pageSize); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    fetchData && fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  const numberOfPages = pageOptions.length / pageSize;

  return (
    <>
      <Spin spinning={Boolean(loading)} delay={500}>
        {data.length > 0 ? (
          <>
            <div className="h-96 overflow-y-scroll overflow-x-scroll p-4 bg-ash rounded-lg">
              <table
                {...getTableProps()}
                className="bg-ash w-full border-separate"
                style={{ borderSpacing: '0 10px' }}>
                <thead>
                  {headerGroups.map(
                    (headerGroup: {
                      getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                        React.ClassAttributes<HTMLTableRowElement> &
                        React.HTMLAttributes<HTMLTableRowElement>;
                      headers: any[];
                    }) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(
                          (column: {
                            getHeaderProps: (
                              arg0: any
                            ) => JSX.IntrinsicAttributes &
                              React.ClassAttributes<HTMLTableCellElement> &
                              React.ThHTMLAttributes<HTMLTableCellElement>;
                            getSortByToggleProps: () => any;
                            render: (
                              arg0: string
                            ) =>
                              | boolean
                              | React.ReactChild
                              | React.ReactFragment
                              | React.ReactPortal
                              | null
                              | undefined;
                            isSorted: any;
                            isSortedDesc: any;
                          }) => (
                            <th
                              {...column.getHeaderProps(column.getSortByToggleProps())}
                              scope="col"
                              className="text-center py-4 font-normal text-grey">
                              {column.render('Header')}
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <DownOutlined />
                                ) : (
                                  <UpOutlined />
                                )
                              ) : (
                                ''
                              )}
                            </th>
                          )
                        )}
                      </tr>
                    )
                  )}
                </thead>
                <tbody {...getTableBodyProps()} className="px-8 bg-ash">
                  {page.map(
                    (row: {
                      getRowProps: () => JSX.IntrinsicAttributes &
                        React.ClassAttributes<HTMLTableRowElement> &
                        React.HTMLAttributes<HTMLTableRowElement>;
                      original: { id: string };
                      cells: any[];
                    }) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          onClick={() => viewData(row.original.id)}
                          className="px-8 border text-center rounded-lg cursor-pointer shadow-2xl mb-8">
                          {row.cells.map(
                            (cell: {
                              getCellProps: () => JSX.IntrinsicAttributes &
                                React.ClassAttributes<HTMLTableCellElement> &
                                React.TdHTMLAttributes<HTMLTableCellElement>;
                              render: (
                                arg0: string
                              ) =>
                                | boolean
                                | React.ReactChild
                                | React.ReactFragment
                                | React.ReactPortal
                                | null
                                | undefined;
                            }) => (
                              <td
                                {...cell.getCellProps()}
                                className="bg-white py-4 capitalize min-w-[100px]">
                                {cell.render('Cell')}
                              </td>
                            )
                          )}
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
            <div>
              {Boolean(isPaginated) && (
                <div className="my-6 shadow-md py-4 px-3 rounded-lg bg-white flex sm:w-6/12 w-full overflow-x-scroll  justify-between">
                  <button
                    type="button"
                    className="text-sky-600 py-2 px-4 border rounded-md"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}>
                    Prev
                  </button>
                  {pageNumbers.map((number) => (
                    <button
                      type="button"
                      key={number}
                      className={`${
                        number === pageIndex + 1 ? 'bg-sky-50 font-bold' : 'text-sky-700 border'
                      } py-2 px-4 rounded-md`}
                      onClick={() => gotoPage(number - 1)}>
                      {number}
                    </button>
                  ))}
                  {pageIndex === numberOfPages - 1 ? null : (
                    <button
                      className="text-sky-700 py-2 px-4 border rounded-md"
                      type="button"
                      onClick={() => nextPage()}
                      disabled={!canNextPage}>
                      Next
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <EmptyTableIcon />
            <p className="text-red-500 mt-4">There&apos;s nothing to see here</p>
          </div>
        )}
      </Spin>
    </>
  );
};

export default Table;
