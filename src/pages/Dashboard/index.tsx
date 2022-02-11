/* eslint-disable  */
import { useState, useEffect, SetStateAction } from 'react';
import { Tabs, Table } from 'antd';
import { ReactComponent as AddUserIcon } from 'assets/icons/user-plus.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as PostIcon } from 'assets/icons/post.svg';
import { ReactComponent as MessageIcon } from 'assets/icons/message.svg';

const { TabPane } = Tabs;

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address'
    }
  ];

  const data: { key: number; name: string; age: number; address: string }[] = [];
  for (let i: number = 0; i < 46; i += 1) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`
    });
  }

  const start = () => {
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
    }, 1000);
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="flex">
      <div
        className={`flex-none ${
          sidebarOpen ? 'w-[116px]' : 'w-0 sm:w-[116px]'
        } h-screen overflow-y-scroll transition-all bg-primary`}>
        <div className="flex flex-col items-center w-full justify-center mt-10">
          <AddUserIcon />
          <p className="text-white uppercase text-xs">Add a user</p>
        </div>
      </div>
      <div className="grow w-24 h-screen overflow-y-scroll bg-light">
        <div className="w-full flex justify-between bg-white shadow-lg px-10 py-6">
          <h2 className="text-2xl font-medium ">Dashboard</h2>
          {!sidebarOpen && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => openSidebar()}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          )}
          {sidebarOpen && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => closeSidebar()}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-1 mt-8 gap-x-8 px-10">
          <div className="shadow-lg rounded-md items-center flex bg-white px-8 py-6 my-3 sm:my-0">
            <UserIcon />
            <div className="px-4">
              <p className="uppercase text-xs text-grey">Users</p>
              <h3 className="text-2xl py-1 font-medium">67</h3>
            </div>
          </div>
          <div className="shadow-lg rounded-md items-center flex bg-white px-8 py-6 my-3 sm:my-0">
            <PostIcon />
            <div className="px-4">
              <p className="uppercase text-xs text-grey">Posts</p>
              <h3 className="text-2xl py-1 font-medium">67</h3>
            </div>
          </div>
          <div className="shadow-lg rounded-md items-center flex bg-white px-8 py-6 my-3 sm:my-0">
            <MessageIcon />
            <div className="px-4">
              <p className="uppercase text-xs text-grey">Comments</p>
              <h3 className="text-2xl py-1 font-medium">67</h3>
            </div>
          </div>
        </div>
        <div className="container px-8 mt-16">
          <div className="grid sm:grid-cols-2 grid-cols-1">
            <Tabs defaultActiveKey="1">
              <TabPane tab="All Users" key="1">
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data}
                  pagination={{ position: ['bottomLeft'] }}
                />
              </TabPane>
              <TabPane tab="All Posts" key="2">
                Content of Tab Pane 2
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
