import { FiEdit, FiMoreVertical } from "react-icons/fi";

interface Props {
  title: string;
}
export default function WorkspaceInfoBlock({ title }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900 capitalize">{title}</h2>
          <FiEdit className="text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <FiMoreVertical className="text-xl text-gray-500" />
        </button>
      </div>
      <p className="text-sm text-gray-500">Johnson & Partners LLP</p>
      <span className="inline-block bg-gray-100 text-gray-800 text-sm px-4 py-1 rounded-full border">
        Criminal
      </span>
    </div>
  );
}
