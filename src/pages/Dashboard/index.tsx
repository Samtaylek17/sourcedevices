import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, message, Checkbox } from 'antd';
import { ReactComponent as AddUserIcon } from 'assets/icons/user-plus.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as PostIcon } from 'assets/icons/post.svg';
import { ReactComponent as MessageIcon } from 'assets/icons/message.svg';
import { RootState } from 'app/rootReducer';
import ProfileCard from 'components/ProfileCard';
import PostCard from 'components/PostCard';
import EmptyPostCard from 'components/EmptyPostCard';
import Table from 'components/Table';
import Lady from 'assets/images/alhaja.png';
import UserTable from 'components/UserTable';
import { fetchUsers } from 'slices/userSlice';
import PostTable from 'components/PostTable';

const { TabPane } = Tabs;

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userList } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const viewUser = () => {
    console.log('This is a user');
  };

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

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
        <div className="w-full flex justify-between bg-white shadow-lg sm:px-10 px-4 py-6">
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
        <div className="grid sm:grid-cols-3 grid-cols-1 mt-8 sm:gap-x-8 sm:px-10 px-4">
          <div className="shadow-lg rounded-md items-center flex bg-white px-8 py-6 my-3 sm:my-0">
            <UserIcon />
            <div className="px-4">
              <p className="uppercase text-xs text-grey">Users</p>
              <h3 className="text-2xl py-1 font-medium">{userList.length}</h3>
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
        <div className="container sm:px-8 mt-16">
          <div className="grid lg:grid-cols-3 sm:grid-cols-3 md:grid-cols-1 sm:gap-16 grid-cols-1">
            <div className="col-span-2">
              <Tabs defaultActiveKey="1">
                <TabPane tab="All Users" key="1">
                  <div className="">
                    <UserTable />
                  </div>
                </TabPane>
                <TabPane tab="All Posts" key="2">
                  <PostTable />
                </TabPane>
              </Tabs>
            </div>

            <div>
              <ProfileCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
