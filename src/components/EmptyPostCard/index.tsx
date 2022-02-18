import { FC } from 'react';
import { ReactComponent as PostIcon } from '../../assets/icons/empty_post.svg';

const EmptyPostCard: FC = () => (
  <div className="flex items-center justify-center bg-white rounded-lg p-6 h-[458px] mb-8">
    <div className="text-center flex flex-col items-center">
      <PostIcon className="inline-block" />
      <span className="mt-4">View a selected post’s full details here</span>
    </div>
  </div>
);

export default EmptyPostCard;
