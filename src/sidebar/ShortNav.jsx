import { Link } from "react-router-dom";

const ShortNav = () => {
  return (
    <div className="flex items-center justify-between">
      <Link to="/" className="text-2xl font-['Great_Vibes',_cursive]">
        <span className=" text-3xl text-[#0CB0D8] hover:text-white ">F</span>
        <span>oysal </span>
      </Link>

      <div className="flex items-center gap-2">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default ShortNav;
