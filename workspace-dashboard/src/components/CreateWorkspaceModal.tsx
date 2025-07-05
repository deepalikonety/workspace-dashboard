// components/CreateWorkspaceModal.tsx
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (workspace: {
    title: string;
    subtitle: string;
    contracts: number;
  }) => void;
}

const CreateWorkspaceModal: React.FC<Props> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [contracts, setContracts] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Workspace</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="e.g. Johnson & Partners"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Area of Law</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="e.g. Litigation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Total Signed Contracts</label>
            <input
              type="number"
              value={contracts}
              onChange={(e) => setContracts(Number(e.target.value))}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="e.g. 0"
              min={0}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onCreate({ title, subtitle, contracts });
                onClose();
                setTitle(""); setSubtitle(""); setContracts(0);
              }}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;
