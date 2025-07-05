// components/CaseTabBlock.tsx
interface Props {
  activeTab: "summary" | "facts";
  setActiveTab: React.Dispatch<React.SetStateAction<"summary" | "facts">>;
  onAddCaseClick: () => void;
  allegations?: string;
  facts?: string;
}

export default function CaseTabsBlock({ activeTab, setActiveTab, onAddCaseClick }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex space-x-6 border-b mb-4">
        {["summary", "facts"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-sm font-medium ${
              activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab as "summary" | "facts")}

          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-700">
        {activeTab === "summary" ? (
          <>
            <p>This is the summary section of the workspace.</p>
            <button
              onClick={onAddCaseClick}
              className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              + Add Case Details
            </button>
          </>
        ) : (
          <p>This is the facts section of the workspace.</p>
        )}
      </div>
    </div>
  );
}
