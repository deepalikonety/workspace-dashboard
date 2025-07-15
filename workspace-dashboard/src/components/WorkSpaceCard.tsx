import { useState } from "react";
import { useRouter } from "next/router";
import { FaCalendarAlt, FaClock, FaCheck } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { formatDistanceToNow } from "date-fns";

// Utility
function getTimeAgo(date: Date) {
  return formatDistanceToNow(date, { addSuffix: true });
}

interface Props {
  id: number;
  title: string;
  subtitle: string;
  contracts: number;
  client?: string;
  opponent?: string;
  timeline?: string;
  slug?: string;
  isCreateCard?: boolean;
  onClick?: () => void;
  createdAt?: string;
  lastActiveAt?: string;
  handleDelete?: (id: number) => void;
}

export default function WorkspaceCard({
  id,
  title,
  subtitle,
  client,
  slug,
  isCreateCard = false,
  onClick,
  createdAt,
  lastActiveAt,
  handleDelete,
}: Props) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (isCreateCard) {
    return (
      <div
        onClick={onClick}
        className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition p-6 rounded-lg flex flex-col items-center justify-center text-center"
      >
        <FaCalendarAlt className="text-3xl text-gray-400 mb-2" />
        <p className="font-medium text-gray-600">Create New Workspace</p>
      </div>
    );
  }

  const finalSlug = slug || encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"));

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4 border border-gray-200 relative">
      {/* Tag */}
      <div>
        <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 font-medium rounded-full">
          {subtitle}
        </span>
      </div>

      {/* Title + Subtitle */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{client || "Johnson & Partners LLP"}</p>
      </div>

      {/* Meta Info */}
      <div className="space-y-1 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-400 text-xs" />
          Created:{" "}
          {createdAt
            ? new Date(createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "N/A"}
        </p>

        <p className="flex items-center gap-2">
          <FaClock className="text-gray-400 text-xs" />
          Last active: {lastActiveAt ? getTimeAgo(new Date(lastActiveAt)) : "N/A"}
        </p>

        <p className="flex items-center gap-2">
          <FaCheck className="text-gray-400 text-xs" />
          12 documents processed
        </p>
      </div>

      {/* Status Tags */}
      <div className="flex gap-2 flex-wrap text-sm">
        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md">3 Drafts</span>
        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md">1 In Review</span>
        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md">0 Completed</span>
      </div>

      {/* Team Avatars */}
      <div className="flex items-center -space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-800 text-white text-xs font-semibold flex items-center justify-center">
          JD
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-800 text-white text-xs font-semibold flex items-center justify-center">
          ML
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold flex items-center justify-center">
          +2
        </div>
      </div>

      <hr />

      {/* Footer */}
      <div className="flex justify-between items-center">
        <button
  onClick={() => router.push(`/workspace/${finalSlug}`)}
  className="text-sm text-gray-800 border border-gray-300 hover:bg-gray-100 bg-white rounded-md flex items-center justify-center gap-1"
  style={{
    width: "94px",
    height: "37px",
    padding: "8px 12px", 
    borderWidth: "1px",
  }}
>
  Open →
</button>


        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-gray-500 hover:text-gray-800 text-lg px-2"
          >
            <HiDotsVertical />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow z-20 text-sm">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  router.push(`/workspace/${finalSlug}`);
                  setDropdownOpen(false);
                }}
              >
                Edit
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                onClick={() => {
                  if (handleDelete) handleDelete(id);
                  setDropdownOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
