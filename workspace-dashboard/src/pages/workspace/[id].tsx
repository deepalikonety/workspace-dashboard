// src/pages/workspace/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import CaseDetailsModal from "@/components/CaseDetailsModal";
import WorkspaceInfoBlock from "@/components/WorkSpaceInfoBlock";
import CaseTabsBlock from "@/components/CaseTabBlock";
import CaseInfoSidebar from "@/components/CaseInfoSideBar";

interface Workspace {
  id: number;
  name: string;
  client: string;
  opponent: string;
  case_type: string;
  date_of_incident?: string;
  allegations?: string;
  facts_summary?: string;
  created_at?: string;
  last_active_at?: string;
}

export default function WorkspaceDetail() {
  const router = useRouter();
  const { id } = router.query as { id?: string };

  const [activeTab, setActiveTab] = useState<"summary" | "facts">("summary");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";


  useEffect(() => {
    if (!id) return;

    const fetchWorkspace = async () => {
      try {
        const res = await fetch(`${API_URL}/api/workspaces/`);
        const data: Workspace[] = await res.json();

        const match = data.find((w) => {
          const slug = encodeURIComponent((w.name || "").trim().toLowerCase().replace(/\s+/g, "-"));
          return slug === id;
        });

        setWorkspace(match || null);
      } catch (err) {
        console.error("Error fetching workspace:", err);
      }
    };

    fetchWorkspace();
  }, [id,API_URL]);

  const workspaceName = workspace?.name || "Workspace";

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <h2 className="text-[26px] font-semibold leading-[100%] tracking-[-0.03em] text-gray-800 px-6 mt-6 mb-4">
          {workspaceName}
        </h2>

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 mb-6 text-sm text-blue-600 hover:underline"
          >
            ← Back
          </button>

          <div className="bg-white rounded-2xl shadow p-8 flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
              <WorkspaceInfoBlock title={workspaceName} />

              <CaseTabsBlock
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onAddCaseClick={() => setIsModalOpen(true)}
                allegations={workspace?.allegations}
                facts={workspace?.facts_summary}
              />
            </div>

            <div className="hidden lg:block border-l pl-8">
              <CaseInfoSidebar
                client={workspace?.client || "N/A"}
                opponent={workspace?.opponent || "N/A"}
                section={workspace?.case_type || "N/A"}
                timeline={`Incident: ${workspace?.date_of_incident || "TBD"}`}
              />
            </div>
          </div>
        </main>

        <CaseDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
