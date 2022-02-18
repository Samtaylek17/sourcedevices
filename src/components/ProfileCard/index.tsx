import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import moment from 'moment';
import { RootState } from '../../app/rootReducer';
import EmptyProfileCard from '../EmptyProfileCard';
import UserIcon from '../../assets/icons/user.svg';

const ProfileCard: FC = () => {
  const { isLoading, currentUser } = useSelector((state: RootState) => state.users);

  return (
    <>
      {currentUser === null ? (
        <EmptyProfileCard />
      ) : (
        <Spin spinning={Boolean(isLoading)} delay={500}>
          <div className="bg-white rounded-lg p-6 h-auto">
            <div className="grid grid-cols-2">
              <img
                src={currentUser?.picture || UserIcon}
                alt={currentUser?.firstName}
                className="w-full max-w-full h-full pr-3 rounded-md"
              />
              <div className="pl-3">
                <div className="">
                  <label className="text-xs uppercase text-grey">Full Name</label>
                  <p className="text-sm capitalize">
                    {currentUser?.title} {currentUser?.firstName} {currentUser?.lastName}
                  </p>
                </div>
                <div className="pt-4">
                  <label className="text-xs uppercase text-grey">Email Address</label>
                  <p className="text-sm break-words">{currentUser?.email}</p>
                </div>
                <div className="pt-4">
                  <label className="text-xs uppercase text-grey">Phone Number</label>
                  <p className="text-sm">{currentUser?.phone}</p>
                </div>
              </div>
            </div>
            <hr className="mt-6" />
            <div className="grid grid-cols-2 gap-x-4">
              <div className="pt-4">
                <label className="text-xs uppercase text-grey">Gender</label>
                <p className="text-sm">{currentUser?.gender}</p>
              </div>
              <div className="pt-4">
                <label className="text-xs uppercase text-grey">Date of birth</label>
                <p className="text-sm">{moment(currentUser?.dateOfBirth).format('Do MMM YYYY')}</p>
              </div>
            </div>
            <hr className="mt-4" />
            <div className="grid grid-cols-2 gap-x-4">
              <div className="pt-4">
                <label className="text-xs uppercase text-grey">Street</label>
                <p className="text-sm">{currentUser?.location?.street}</p>
              </div>
              <div className="pt-4">
                <label className="text-xs uppercase text-grey">CITY</label>
                <p className="text-sm">{currentUser?.location?.city}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="pt-4">
                <label className="text-xs uppercase text-grey">State</label>
                <p className="text-sm">{currentUser?.location?.state}</p>
              </div>
              <div className="pt-4">
                <label className="text-xs uppercase text-grey">Country</label>
                <p className="text-sm">{currentUser?.location?.country}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="pt-4">
                <label className="text-xs uppercase text-grey">Year Enroled</label>
                <p className="text-sm">{moment(currentUser?.registerDate).format('YYYY')}</p>
              </div>
            </div>
            <hr className="mt-4" />
            <div className="grid grid-cols-2 gap-x-4">
              <div className="pt-4">
                <label className="text-xs uppercase text-grey">Registered</label>
                <p className="text-sm">{moment(currentUser?.registerDate).format('Do MMM YYYY')}</p>
              </div>
              <div className="pt-4">
                <label className="text-xs uppercase text-grey">LAST UPDATED</label>
                <p className="text-sm">{moment(currentUser?.updatedDate).format('Do MMM YYYY')}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="pt-4">
                <label className="text-xs uppercase text-grey">Posts</label>
                <p className="text-sm">21</p>
              </div>
              <div className="pt-4">
                <label className="text-xs uppercase text-grey">COMMENTS</label>
                <p className="text-sm">68</p>
              </div>
            </div>
          </div>
        </Spin>
      )}
    </>
  );
};

export default ProfileCard;
