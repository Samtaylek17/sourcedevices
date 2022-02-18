import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { RootState } from '../../app/rootReducer';
import EmptyPostCard from '../EmptyPostCard';

const PostCard: FC = () => {
  const { isLoading, currentPost } = useSelector((state: RootState) => state.posts);
  return (
    <>
      {currentPost === null ? (
        <EmptyPostCard />
      ) : (
        <Spin spinning={Boolean(isLoading)} delay={500}>
          <div className="bg-white rounded-lg p-6 h-auto mb-8 ">
            <div className="">
              <img
                src={currentPost?.image}
                alt={currentPost?.text}
                className="w-full max-w-full h-64 rounded-t-lg object-cover"
              />
              <p className="mt-2">{currentPost?.text}</p>
              <div className="mt-2 text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{currentPost?.likes} Likes</span>
              </div>
            </div>
            <div className="pt-4">
              <label className="text-xs uppercase text-grey">Tags</label>
              <div className="flex mt-2">
                {currentPost?.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 mx-2 border rounded-2xl text-center text-[9px] leading-5 uppercase text-grey bg-sky-50 border-sky-400 font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <hr className="mt-6" />
            <div className="">
              <span className="text-grey uppercase">Owner</span>
            </div>
            <hr className="" />
            <div className="flex mt-4 items-center">
              <img
                src={currentPost?.owner.picture}
                alt={currentPost?.owner.firstName}
                className="rounded-3xl h-8 w-8"
              />
              <span className="pl-4">
                {currentPost?.owner?.firstName} {currentPost?.owner?.lastName}
              </span>
            </div>
            <div className="pt-2">
              <label className="text-[10px] leading-[12px] uppercase text-grey">Full name</label>
              <p className="text-sm capitalize">
                {currentPost?.owner.title}. {currentPost?.owner?.firstName}{' '}
                {currentPost?.owner?.lastName}
              </p>
            </div>
            <div className="pt-2">
              <label className="text-[10px] leading-[12px] uppercase text-grey">
                Email Address
              </label>
              <p className="text-sm">{currentPost?.owner?.email}</p>
            </div>

            <div className="pt-2">
              <label className="text-[10px] leading-[12px] uppercase text-grey">Phone Number</label>
              <p className="text-sm">{currentPost?.owner?.phone}</p>
            </div>
          </div>
        </Spin>
      )}
    </>
  );
};

export default PostCard;
