import { FC } from 'react';
import Dog from 'assets/images/dog.png';
import Lady from 'assets/images/alhaja.png';

const PostCard: FC = () => (
  <div className="bg-white rounded-lg p-6 h-auto mb-8 ">
    <div className="">
      <img src={Dog} alt={Dog} className="w-full max-w-full h-full rounded-t-lg" />
      <p className="mt-2">adult Labrador retriever</p>
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
        <span>96 Likes</span>
      </div>
    </div>
    <div className="pt-4">
      <label className="text-xs uppercase text-grey">Tags</label>
      <div className="flex mt-2">
        <span className="px-2 border rounded-2xl text-center text-[9px] leading-5 uppercase text-grey bg-sky-50 border-sky-400 font-bold">
          Animal
        </span>
        <span className="mx-2 px-2 border rounded-2xl text-center text-[9px] leading-5 uppercase text-grey bg-sky-50 border-sky-400 font-bold">
          Dog
        </span>
        <span className="px-2 border rounded-2xl text-center text-[9px] leading-5 uppercase text-grey bg-sky-50 border-sky-400 font-bold">
          Golden Retriever
        </span>
      </div>
    </div>
    <hr className="mt-6" />
    <div className="">
      <span className="text-grey uppercase">Owner</span>
    </div>
    <hr className="" />
    <div className="flex mt-4 items-center">
      <img src={Lady} alt={Lady} className="rounded-3xl h-8 w-8" />
      <span className="pl-4">Edita Lane</span>
    </div>
    <div className="pt-2">
      <label className="text-[10px] leading-[12px] uppercase text-grey">Full name</label>
      <p className="text-sm">Mrs. Edita Lane</p>
    </div>
    <div className="pt-2">
      <label className="text-[10px] leading-[12px] uppercase text-grey">Email Address</label>
      <p className="text-sm">editalane@gmail.com</p>
    </div>
    <div className="pt-2">
      <label className="text-[10px] leading-[12px] uppercase text-grey">Email Address</label>
      <p className="text-sm">editalane@gmail.com</p>
    </div>
    <div className="pt-2">
      <label className="text-[10px] leading-[12px] uppercase text-grey">Phone Number</label>
      <p className="text-sm">90398484</p>
    </div>
  </div>
);

export default PostCard;
