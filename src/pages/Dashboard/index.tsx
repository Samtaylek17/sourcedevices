import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import UserForm from '../../components/UserForm';
import UserModal from '../../components/ModalComponent';
import { ReactComponent as AddUserIcon } from '../../assets/icons/user-plus.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import { ReactComponent as PostIcon } from '../../assets/icons/post.svg';
import { ReactComponent as MessageIcon } from '../../assets/icons/message.svg';
import ProfileCard from '../../components/ProfileCard';
import PostCard from '../../components/PostCard';
import UserTable from '../../components/UserTable';
import { getAllUsers, getAllPosts, getAllComments } from '../../api/endpoints';
import PostTable from '../../components/PostTable';

const { TabPane } = Tabs;

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState(0);
  const [posts, setPosts] = useState(0);
  const [comments, setComments] = useState(0);
  const [tabKey, setTabKey] = useState('1');

  const fetchData = async () => {
    const userRes = await getAllUsers();
    const postRes = await getAllPosts();
    const commentRes = await getAllComments();
    setUsers(userRes.data.total);
    setPosts(postRes.data.total);
    setComments(commentRes.data.total);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const closeModal = () => {
    setOpenModal(false);
  };

  const onSubmitForm = () => {
    setOpenModal(false);
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
        <button
          type="button"
          className="flex flex-col items-center w-full justify-center mt-10"
          onClick={() => setOpenModal(true)}>
          <AddUserIcon />
          <p className="text-white uppercase text-xs">Add a user</p>
        </button>
        <UserModal isOpen={openModal}>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:items-start w-full">
                <div className="mt-3 sm:mt-0 sm:text-left">
                  <h3
                    className="mb-3 text-3xl uppercase font-bold leading-6 text-slate-500"
                    id="modal-title">
                    Add User
                  </h3>
                  <p className="text-lg text-slate-500 font-medium">Personal Details</p>
                  <UserForm isSubmitted={() => onSubmitForm()} />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="py-2 px-4 bg-red-600 text-white rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </UserModal>
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
              <h3 className="text-2xl py-1 font-medium">{users}</h3>
            </div>
          </div>
          <div className="shadow-lg rounded-md items-center flex bg-white px-8 py-6 my-3 sm:my-0">
            <PostIcon />
            <div className="px-4">
              <p className="uppercase text-xs text-grey">Posts</p>
              <h3 className="text-2xl py-1 font-medium">{posts}</h3>
            </div>
          </div>
          <div className="shadow-lg rounded-md items-center flex bg-white px-8 py-6 my-3 sm:my-0">
            <MessageIcon />
            <div className="px-4">
              <p className="uppercase text-xs text-grey">Comments</p>
              <h3 className="text-2xl py-1 font-medium">{comments}</h3>
            </div>
          </div>
        </div>
        <div className="container sm:px-8 mt-16">
          <div className="grid lg:grid-cols-3 sm:grid-cols-3 md:grid-cols-1 sm:gap-16 grid-cols-1">
            <div className="col-span-2">
              <Tabs defaultActiveKey="1" onChange={(activeKey) => setTabKey(activeKey)}>
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

            <div>{tabKey === '1' ? <ProfileCard /> : <PostCard />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
