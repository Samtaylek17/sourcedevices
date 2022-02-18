import { FC } from 'react';
import { ReactComponent as UserIcon } from '../../assets/icons/empty_profile.svg';

const EmptyProfileCard: FC = () => (
  <div className="flex items-center justify-center bg-white rounded-lg p-6 h-[458px] mb-8">
    <div className="text-center flex flex-col items-center">
      <UserIcon className="inline-block" />
      <span className="mt-4">View a selected user’s full details here</span>
    </div>
  </div>
);

export default EmptyProfileCard;
