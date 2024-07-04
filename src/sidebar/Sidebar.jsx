import ShortNav from "./ShortNav";
import ImgNav from "./ImgNav";
import { Link } from "react-router-dom";
import {
  MdMiscellaneousServices,
  MdOutlineAdminPanelSettings,
  MdOutlinePortrait,
} from "react-icons/md";
import { TbDevicesStar } from "react-icons/tb";
import { FaBlogger } from "react-icons/fa6";

function Sidebar() {
  return (
    <ul className="menu bg-[#0F172A] text-white min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <ShortNav />
      <ImgNav />

      <div className=" border-b pb-3 border-[#e9d5d52f]"></div>

      <div className=" space-y-1 mt-6">
        <Link className="nav-link">
          <MdOutlineAdminPanelSettings className="text-3xl" />
          <span className="text-[#d6e3f3]">Admin Home</span>
        </Link>
        <Link to={"/project"} className="nav-link">
          <MdOutlinePortrait className="text-2xl" />
          <span className="text-[#d6e3f3]">Personal Projects</span>
        </Link>
        <Link to="/skill" className="nav-link">
          <MdMiscellaneousServices className="text-2xl" />
          <span className="text-[#d6e3f3]">Skills</span>
        </Link>
        <Link to={"/experience"} className="nav-link">
          <TbDevicesStar className="text-2xl" />
          <span className="text-[#d6e3f3]">Experience</span>
        </Link>
        <Link to="/blog" className="nav-link">
          <FaBlogger className="text-2xl" />
          <span className="text-[#d6e3f3]">Blogs</span>
        </Link>
      </div>
    </ul>
  );
}

export default Sidebar;
