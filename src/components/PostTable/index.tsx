import { FC, useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { message, Checkbox } from 'antd';
import moment from 'moment';
import { getAllPostsWithFilter } from 'api/endpoints';
import { fetchPost } from 'slices/postSlice';
import Table from '../Table';

const PostTable: FC = () => {
  const fetchIdRef = useRef(0);
  const [tableLoading, setTableLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

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
      Cell: useCallback(() => <Checkbox className="inline-block" />, [])
    },
    {
      Header: 'OWNER',
      accessor: 'owner.picture',
      Cell: useCallback(
        ({ value }) => (
          <img src={value} alt={value} className="rounded-full h-9 w-9 inline-block" />
        ),
        []
      )
    },
    {
      Header: () => null,
      accessor: 'owner.firstName'
    },
    {
      Header: () => null,
      accessor: 'owner.lastName'
    },
    {
      Header: 'POST',
      accessor: 'text'
    },
    {
      Header: 'Likes',
      accessor: 'likes',
      Cell: useCallback(
        ({ value }) => (
          <>
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              <span>{value}</span>
            </div>
          </>
        ),
        []
      )
    },
    {
      Header: 'PUBLISH DATE',
      accessor: 'publishDate',
      Cell: ({ value }) => {
        if (value) {
          return moment(value).format('MMMM Do YYYY');
        }
        return '--';
      }
    }
  ];

  const viewPost = (id: string) => {
    dispatch(fetchPost(id));
  };

  return (
    <Table
      pageCount={pageCount}
      data={data}
      columns={columns}
      viewData={viewPost}
      fetchData={fetchData}
      loading={tableLoading}
    />
  );
};

export default PostTable;
