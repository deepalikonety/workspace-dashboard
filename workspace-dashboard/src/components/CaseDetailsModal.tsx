import { Dialog } from "@headlessui/react";
import { FiUpload, FiX } from "react-icons/fi";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}
type CaseFormFields = {
  caseType: string;
  complainant: string;
  accused: string;
  victim: string;
  allegations: string;
  facts: string;
  date: string;
  representing: string[];
};

export default function CaseDetailsModal({ isOpen, onClose, onSave }: Props) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const [manualMode, setManualMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<CaseFormFields>({
  caseType: "Criminal",
  complainant: "",
  accused: "",
  victim: "",
  allegations: "",
  facts: "",
  date: "",
  representing: [],
});


  const dynamicPeople = [formData.accused.trim(), formData.victim.trim()].filter(Boolean);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleRepresentation = (person: string) => {
    setFormData((prev) => ({
      ...prev,
      representing: prev.representing[0] === person ? [] : [person],
    }));
  };

  const formatDateForBackend = (input: string) => {
    const [day, month, year] = input.split(".");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    if (!manualMode) {
      onSave();
      onClose();
      return;
    }

    const newWorkspace = {
      name: `${formData.caseType} Case`,
      client: formData.complainant || "Unknown",
      opponent: formData.accused || "Unknown",
      case_type: formData.caseType,
      accused: formData.accused,
      victim: formData.victim,
      allegations: formData.allegations,
      facts_summary: formData.facts,
      date_of_incident: formatDateForBackend(formData.date),
      representatives: formData.representing.join(", "),
    };

    try {
      const res = await fetch(`${API_URL}/api/workspaces/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newWorkspace),
});

      
      const data = await res.json();
      if (res.ok) {
        console.log("✅ Workspace saved to backend:", data);
        onSave();
        onClose();
      } else {
        console.error("❌ Error saving workspace:", data);
        alert("Something went wrong: " + data.error);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Failed to reach backend.");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/15" aria-hidden="true" />

      <Dialog.Panel className="relative bg-white rounded-xl w-full max-w-md max-h-[90vh] flex flex-col shadow-lg z-50 border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black z-10"
        >
          <FiX className="text-xl" />
        </button>

        <div className="overflow-y-auto px-6 py-6 space-y-6">
          <Dialog.Title className="text-2xl font-semibold">Case Details</Dialog.Title>

          {/* Upload Mode */}
          {!manualMode && (
            <>
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md h-44 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
              >
                <FiUpload className="text-3xl text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 font-medium">
                  {uploadedFile ? uploadedFile.name : "Drag and drop your document"}
                </p>
                <span className="text-xs text-gray-500">or click to browse files</span>
                <span className="text-xs text-gray-400 mt-1">PDF (max. 20 MB)</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                />
              </label>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-200" />
                <span className="mx-4 text-sm text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-200" />
              </div>

              <textarea
                placeholder="Enter case description"
                className="w-full border rounded px-3 py-2 text-sm resize-none min-h-[100px]"
                value={formData.facts}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, facts: e.target.value }))
                }
              />

              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="mt-4 bg-black text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-900 transition"
                >
                  Run AI Summariser
                </button>
              </div>

              <button
                onClick={() => setManualMode(true)}
                className="block mx-auto text-blue-600 hover:underline text-sm font-medium mt-2"
              >
                Fill case facts manually
              </button>
            </>
          )}

          {/* Manual Mode */}
          {manualMode && (
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 shadow-sm">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Case Type
                  </label>
                  <select
                    name="caseType"
                    value={formData.caseType}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                  >
                    <option>Criminal</option>
                    <option>Civil</option>
                    <option>Corporate</option>
                  </select>
                </div>

                {(["complainant", "accused", "victim"] as Array<keyof typeof formData>).map((name) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </label>
                    <input
                      type="text"
                      name={name}
                      value={formData[name as keyof CaseFormFields]}

                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 text-sm"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Allegations
                  </label>
                  <textarea
                    name="allegations"
                    value={formData.allegations}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Facts Summary
                  </label>
                  <textarea
                    name="facts"
                    value={formData.facts}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of incident
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="DD.MM.YYYY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Representing (please select)
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {dynamicPeople.map((person, idx) => {
                      const selected = formData.representing.includes(person);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleRepresentation(person)}
                          className={`min-w-[115px] h-[43px] px-[10px] py-[11px] rounded-[6px] text-sm border text-center ${
                            selected
                              ? "bg-black text-white border-black"
                              : "text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {person}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </form>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-4 border-t px-6 py-4 bg-white sticky bottom-0 z-10">
                <button
                  onClick={() => setManualMode(false)} 
                  className="text-sm text-black border border-gray-400 rounded-[6px] px-[20px] py-[8px] hover:bg-gray-100"
                  style={{ width: "98px", height: "40px" }}
                >
                  Go Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="text-sm bg-black text-white rounded-[6px] px-[20px] py-[8px] hover:bg-gray-800"
                  style={{ width: "132px", height: "40px" }}
                >
                  Save Details
                </button>
              </div>
            </div>
          )}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
