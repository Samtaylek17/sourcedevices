/* eslint-disable react/jsx-no-useless-fragment */
import React, { useMemo, FC, useEffect } from 'react';
import { useTable, useSortBy, usePagination, useRowSelect, useExpanded } from 'react-table';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { UserInterface } from 'slices/userSlice';
import { ReactComponent as EmptyTableIcon } from '../../assets/icons/empty_table.svg';

interface TableProps {
  body: UserInterface[];
  header: Record<string, unknown>[];
  viewData: any;
  pageCount: number;
  loading: boolean;
  isPaginated: boolean;
  fetchData: any;
}

const Table: FC<TableProps> = ({
  body,
  header,
  pageCount: controlledPageCount,
  loading,
  fetchData,
  viewData,
  isPaginated = true,
  ...props
}) => {
  const columns = useMemo(() => header, []);
  const data = useMemo(() => body, [body]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 20,
        hiddenColumns: columns.filter((column) => !column.show).map((column) => column.id)
      },
      manualPagination: true,
      pageCount: controlledPageCount,
      manualSortBy: true,
      autoResetPage: false
    },
    useSortBy,
    usePagination,
    useRowSelect,
    useExpanded
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex, pageSize },
    gotoPage,
    pageCount,
    prepareRow,
    setPageSize,
    setHiddenColumns
  } = tableInstance;

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    fetchData && fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  const firstPageRows = page.slice(0, 10);
  console.log(page);

  return (
    <>
      {body.length > 0 ? (
        <>
          <table {...getTableProps()}>
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
                        <th {...column.getHeaderProps(column.getSortByToggleProps())} scope="col">
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
            <tbody {...getTableBodyProps()}>
              {firstPageRows.map(
                (row: {
                  getRowProps: () => JSX.IntrinsicAttributes &
                    React.ClassAttributes<HTMLTableRowElement> &
                    React.HTMLAttributes<HTMLTableRowElement>;
                  original: { surveyId: any };
                  cells: any[];
                }) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} onClick={() => viewData(row.original.surveyId)}>
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
                          <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        )
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
            {/* <tfoot>
					{footerGroups.map((footerGroup) => (
						<tr {...footerGroup.getFooterGroupProps()}>
							{footerGroup.headers.map((column) => (
								<td {...column.getFooterProps}>{column.render('Footer')}</td>
							))}
						</tr>
					))}
				</tfoot> */}
          </table>
          <div className="mb-5">
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <button type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>
            <button type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <button type="button" onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
            <button type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </button>
          </div>
        </>
      ) : (
        <EmptyTableIcon />
      )}
    </>
  );
};

export default Table;
