import { useState } from "react";
import { useRouter } from "next/router";
import { HiDotsVertical } from "react-icons/hi";

interface WorkspaceTableRowProps {
  id: number;
  title: string;
  subtitle: string;
  contracts: number;
  client: string;
  opponent: string;
  caseType: string;
  area: string;
  timeline: string;
  slug: string;
  handleDelete?: (id: number) => void;
}

const WorkspaceTableRow: React.FC<WorkspaceTableRowProps> = ({
  id,
  title,
  client,
  opponent,
  caseType,
  area,
  timeline,
  slug,
  handleDelete,
}) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <tr className="border-b hover:bg-gray-50 text-sm text-gray-700 relative">
      <td className="py-3 px-4 font-semibold">{title}</td>
      <td className="py-3 px-4">{client}</td>
      <td className="py-3 px-4">{opponent}</td>
      <td className="py-3 px-4">
        <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
          {caseType}
        </span>
      </td>
      <td className="py-3 px-4">{area}</td>
      <td className="py-3 px-4">
        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
          {timeline}
        </span>
      </td>
      <td className="py-3 px-4 text-right">
        <div className="relative inline-block text-left">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-gray-500 hover:text-gray-800 text-lg"
          >
            <HiDotsVertical />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 z-20 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg">
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                onClick={() => {
                  router.push(`/workspace/${slug}`);
                  setDropdownOpen(false);
                }}
              >
                Edit
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
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
      </td>
    </tr>
  );
};

export default WorkspaceTableRow;
