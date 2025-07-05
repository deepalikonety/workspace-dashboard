
import { useState } from "react";
import { FiGrid, FiUsers, FiCreditCard, FiSettings, FiMessageCircle, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const [active, setActive] = useState("Workspaces");

  const menuItems = [
    { label: "Workspaces", icon: <FiGrid /> },
    { label: "Team Management", icon: <FiUsers /> },
    { label: "Billings & Plans", icon: <FiCreditCard /> },
    { label: "Settings", icon: <FiSettings /> },
    { label: "Contact Admin", icon: <FiMessageCircle /> },
  ];

  return (
    <aside className="h-screen w-64 bg-[#02242F] text-white flex flex-col justify-between p-4">
      <div>
        <h1 className="text-2xl font-bold mb-6">LeXi Ai</h1>

        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-all ${
                active === item.label ? "bg-[#3B4B52] font-semibold" : "hover:bg-[#1e2e35]"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <button className="flex items-center gap-3 text-sm hover:text-red-400 transition">
          <FiLogOut className="text-lg" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
