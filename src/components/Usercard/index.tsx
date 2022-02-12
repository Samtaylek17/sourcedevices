import Lady from '../../assets/images/alhaja.png';

const UserCard = () => (
  <div className="bg-white rounded-lg p-6 h-auto">
    <div className="grid grid-cols-2">
      <img src={Lady} alt={Lady} className="w-full max-w-full h-full pr-3 rounded-md" />
      <div className="pl-3">
        <div className="">
          <label className="text-xs uppercase text-grey">Full Name</label>
          <p className="text-sm">Mrs. Edita Lane</p>
        </div>
        <div className="pt-4">
          <label className="text-xs uppercase text-grey">Email Address</label>
          <p className="text-sm">editalane@gmail.com</p>
        </div>
        <div className="pt-4">
          <label className="text-xs uppercase text-grey">Phone Number</label>
          <p className="text-sm">92694011</p>
        </div>
      </div>
    </div>
    <hr className="mt-6" />
    <div className="grid grid-cols-2 gap-x-4">
      <div className="pt-4">
        <label className="text-xs uppercase text-grey">Gender</label>
        <p className="text-sm">Female</p>
      </div>
      <div className="pt-4">
        <label className="text-xs uppercase text-grey">Date of birth</label>
        <p className="text-sm">30 - Apr - 1996</p>
      </div>
    </div>
    <hr className="mt-4" />
    <div className="grid grid-cols-2 gap-x-4">
      <div className="pt-4">
        <label className="text-xs uppercase text-grey">Street</label>
        <p className="text-sm">9614, SÃ¸ndermarksvej</p>
      </div>
      <div className="pt-4">
        <label className="text-xs uppercase text-grey">CITY</label>
        <p className="text-sm">Kongsvinger</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-x-4">
      <div className="pt-4">
        <label className="text-xs uppercase text-grey">State</label>
        <p className="text-sm">Nordjylland</p>
      </div>
      <div className="pt-4">
        <label className="text-xs uppercase text-grey">Country</label>
        <p className="text-sm">Denmark</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-x-4">
      <div className="pt-4">
        <label className="text-xs uppercase text-grey">Year Enroled</label>
        <p className="text-sm">-9:00</p>
      </div>
    </div>
    <hr className="mt-4" />
    <div className="grid grid-cols-2 gap-x-4">
      <div className="pt-4">
        <label className="text-xs uppercase text-grey">Registered</label>
        <p className="text-sm">21 - Jun - 2021 </p>
      </div>
      <div className="pt-4">
        <label className="text-xs uppercase text-grey">LAST UPDATED</label>
        <p className="text-sm">21 - Jun - 2021</p>
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
);

export default UserCard;
