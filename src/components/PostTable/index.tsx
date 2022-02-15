import { FC, useCallback, useRef, useState } from 'react';
import { message, Checkbox } from 'antd';
import { getAllPostsWithFilter } from 'api/endpoints';
import Table from '../Table';

const PostTable: FC = () => {
  const fetchIdRef = useRef(0);
  const [tableLoading, setTableLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);

  const fetchAPIData = async ({ limit, page }) => {
    try {
      setTableLoading(true);
      const response = await getAllPostsWithFilter({ limit, page });
      setData(response.data.data);
      setPageCount(response.data.total);
      setTableLoading(false);
    } catch (err: any) {
      message.error(err.toString());
    }
  };

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    if (fetchId === fetchIdRef.current) {
      fetchAPIData({
        limit: pageSize,
        page: pageIndex
      });
    }
  }, []);

  const columns = [
    {
      Header: <Checkbox />,
      accessor: 'actions',
      Cell: useCallback(
        () => (
          <td className="text-center">
            <Checkbox />
          </td>
        ),
        []
      )
    },
    {
      Header: 'OWNER',
      accessor: 'owner',
      Cell: useCallback(
        ({ value }) => (
          <td className="text-center">
            <img src={value} alt={value} className="rounded-full h-9 w-9 inline-block" />
          </td>
        ),
        []
      )
    },
    {
      Header: 'TITLE',
      accessor: 'title'
    },
    {
      Header: 'FIRST NAME',
      accessor: 'firstName'
    },
    {
      Header: 'LAST NAME',
      accessor: 'lastName'
    },
    {
      Header: 'PUBLISH DATE',
      accessor: 'publishDate'
    }
  ];

  const viewUser = () => {
    console.log('This is a user');
  };

  return (
    <Table
      pageCount={pageCount}
      data={data}
      columns={columns}
      viewData={viewUser}
      fetchData={fetchData}
      loading={tableLoading}
    />
  );
};

export default PostTable;
