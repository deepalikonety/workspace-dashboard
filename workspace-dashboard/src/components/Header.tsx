import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import Image from "next/image";

import { FaChevronDown } from "react-icons/fa";
export default function Header() {
  return (
    <header
      className="w-full border-b border-gray-200 bg-white"
      style={{ height: "70px" }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* 🔍 Search Input */}
        <div className="relative" style={{ width: "280px" }}>
          <input
  type="text"
  placeholder="Search..."
  
  className="w-full h-[35px] border border-[#CDD2D5] rounded-md pl-10 pr-4 text-gray-800 placeholder:text-gray-500"
  style={{
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "12px", 
    letterSpacing: "0px",
  }}
/>

          <IoSearchOutline className="absolute left-3 top-3  text-gray-400 w-[16px] h-[16px] text-sm" />
          
        </div>

        {/* 🔔 Bell + Avatar */}
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700 relative">
            <FaRegBell className="w-[24px] h-[24px] " />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-800">John Doe</span>
          <Image
  src="/profile.jpg"
  alt="User Avatar"
  width={36}
  height={36}
  className="rounded-full border"
/>


             <FaChevronDown className="text-gray-600 text-xs mt-[2px]" />
          </div>
        </div>
      </div>
    </header>
  );
}
