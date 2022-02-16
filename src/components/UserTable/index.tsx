import { FC, useCallback, useRef, useState } from 'react';
import { message, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { getAllUsersWithFilters } from 'api/endpoints';
import { fetchUser } from 'slices/userSlice';
import Table from '../Table';

const UserTable: FC = () => {
  const fetchIdRef = useRef(0);
  const [tableLoading, setTableLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const fetchAPIData = async ({ limit, page }) => {
    try {
      setTableLoading(true);
      const response = await getAllUsersWithFilters({ limit, page });
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
      Cell: useCallback(() => <Checkbox />, [])
    },
    {
      Header: 'OWNER',
      accessor: 'owner',
      Cell: useCallback(
        (cellInfo) => (
          <img
            src={cellInfo.row.original.picture}
            alt={cellInfo.row.original.picture}
            className="rounded-full h-9 w-9 inline-block"
          />
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
      Header: 'ID',
      accessor: 'id'
    }
  ];

  const viewUser = (id: string) => {
    dispatch(fetchUser(id));
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

export default UserTable;
