// ✅ Corrected Dashboard (index.tsx)
import { useEffect, useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import WorkspaceCard from "@/components/WorkSpaceCard";
import CreateWorkspaceModal from "@/components/CreateWorkspaceModal";
import CaseDetailsModal from "@/components/CaseDetailsModal";
import KPIStatCard from "@/components/KPIStatCard";
import WorkspaceTableRow from "@/components/WorkspaceTableRow";
import { HiViewGrid, HiViewList } from "react-icons/hi";
import { HiOutlinePencilAlt, HiOutlineGlobeAlt } from "react-icons/hi";
import { FiGrid } from "react-icons/fi";
import { RiCheckDoubleFill } from "react-icons/ri";
import { FaRegFile } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import toast from "react-hot-toast";

export type Workspace = {
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
};

type DashboardWorkspace = Workspace & {
  slug: string;
  title: string;
  subtitle: string;
  contracts: number;
  type: string;
  status: string;
  area: string;
  timeline: string;
  caseType: string;
  createdAt?: string;
  lastActiveAt?: string;
};

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<"contract" | "litigation">("contract");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState<DashboardWorkspace[]>([]);

  const fetchWorkspaces = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8000/api/workspaces/");
      const rawData = await res.json();

      const normalized = (rawData as Workspace[]).map((w) => ({
        ...w,
        slug: encodeURIComponent((w.name || "").toLowerCase().replace(/\s+/g, "-")),
        title: w.name || "Untitled",
        subtitle: w.case_type || "Litigation",
        contracts: 0,
        type: "litigation",
        status: "active",
        area: "General Law",
        timeline: w.date_of_incident ? `Incident: ${w.date_of_incident}` : "TBD",
        caseType: w.case_type || "N/A",
        createdAt: w.created_at,
        lastActiveAt: w.last_active_at,
      }));

      setWorkspaces(normalized);
    } catch (err) {
      console.error("❌ Failed to fetch workspaces:", err);
    }
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/api/workspaces/${id}/`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        toast.success("Workspace deleted");
        setWorkspaces((prev) => prev.filter((w) => w.id !== id));
      } else {
        toast.error("Failed to delete workspace");
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  const filteredWorkspaces = workspaces
    .filter((workspace) => workspace.type === activeTab)
    .filter((workspace) => workspace.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((workspace) => (typeFilter ? workspace.type === typeFilter : true))
    .filter((workspace) => (statusFilter ? workspace.status === statusFilter : true));
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

<h2 className="text-xl font-semibold text-gray-800 px-6 mt-6 mb-4">Dashboard Overview</h2>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-6 py-4 bg-gray-50">
  <KPIStatCard
    icon={<FiGrid className="text-purple-500 w-full h-full" />}
    label="Total Workspaces"
    count={4}
    trend="+12%"
    trendColor="green"
  />

  <KPIStatCard
    icon={<FaRegFile className="text-blue-500 w-full h-full" />}
    count={51}
    label="Total Signed Contracts"
    trend="+15%"
    trendColor="green"
  />
  <KPIStatCard
    icon={<HiOutlinePencilAlt className="text-yellow-500 w-full h-full" />}
    count={4}
    label="Contracts Drafted"
    trend="-4%"
    trendColor="red"
  />
  <KPIStatCard
    icon={<RiCheckDoubleFill
       className="text-green-500 w-full h-full" />}
    count={18}
    label="Contracts Reviewed"
    trend="+12%"
    trendColor="green"
  />
  <KPIStatCard
    icon={<HiOutlineGlobeAlt className="text-pink-500 w-full h-full" />}
    count={9}
    label="Contracts Translated"
    trend="+10%"
    trendColor="green"
  />
</div>

        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {/* View Toggle */}
          <div className="flex items-center justify-between mb-4">
            <h3
  className="text-[22px] font-semibold text-gray-800 tracking-[-0.03em] leading-[100%] font-[Poppins]"
  style={{ width: "133px", height: "33px" }}
>Workspaces</h3>
           

<div className="flex items-center gap-2 bg-white border border-[#CDD2D5] rounded-md px-1 h-[35px] w-auto">
  <button
    className={`flex items-center gap-1 px-3 py-1 rounded-md text-[12px] font-medium leading-none tracking-normal ${
      view === "grid"
        ? "bg-gray-800 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`}
    onClick={() => setView("grid")}
  >
    <HiViewGrid className="text-[14px]" />
    Grid
  </button>

  <button
    className={`flex items-center gap-1 px-3 py-1 rounded-md text-[12px] font-medium leading-none tracking-normal ${
      view === "list"
        ? "bg-gray-800 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`}
    onClick={() => setView("list")}
  >
    <HiViewList className="text-[14px]" />
    List
  </button>
</div>


          </div>

          {/* Tabs */}
          <div className="w-full border-b border-gray-200 mb-4">
            <div className="flex gap-8 px-1">
              {["contract", "litigation"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "contract" | "litigation")}
                  className={`pb-3 text-sm font-medium ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-start gap-4 mb-6 px-2 ml-2">
            <div className="relative" style={{ width: "411px", height: "35px" }}>
  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
  <input
    type="text"
    placeholder="Search by Workspace Name / Client Name"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full h-full border border-[#CDD2D5] rounded-md pl-10 pr-4 py-2 text-sm placeholder:text-gray-500 text-gray-800"
    style={{
      fontSize: "13px", // so the placeholder fits better
      paddingTop: "6px",
      paddingBottom: "6px",
    }}
  />
</div>


            <select
              className="border px-3 py-2 rounded-md text-sm text-gray-700"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="contract">Contract</option>
              <option value="litigation">Litigation</option>
            </select>

            <select
              className="border px-3 py-2 rounded-md text-sm text-gray-700"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>

            <button
              onClick={() => setIsCaseModalOpen(true)}
              className="border px-4 py-2 rounded-md text-sm text-white hover:bg-gray-500 bg-gray-500"
            >
              + Create New Workspace
            </button>
          </div>

          {/* Grid or List View */}
          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white rounded-xl shadow border border-gray-200 p-6 space-y-4">
              {filteredWorkspaces.map((workspace, index) => (
                <WorkspaceCard
  key={index}
  title={workspace.title}
  subtitle={workspace.subtitle}
  contracts={workspace.contracts}
  client={workspace.client}
  opponent={workspace.opponent}
  timeline={workspace.timeline}
  slug={workspace.slug}
  createdAt={workspace.createdAt}
  lastActiveAt={workspace.lastActiveAt}
  id={workspace.id} 
  handleDelete={handleDelete}
/>

              ))}

              {/* Upgrade Card */}
             <div
  onClick={() => setIsCaseModalOpen(true)} // 👈 same fix here
  className="w-[369px] h-[380px] bg-[#F3F6F7] border border-gray-300 rounded-xl flex flex-col justify-center items-center text-center p-6 text-gray-600 shadow-md cursor-pointer hover:opacity-90 transition"
  style={{
    boxShadow: '1px 1px 4px 1px #C1B8B840',
  }}
>
  <AiOutlineFileAdd className="text-5xl text-black mb-4" />
  <p className="w-[279px] h-[54px] text-[18px] gap-3 text-black leading-tight tracking-[-0.03em] font-[500] text-center">
    Upgrade to add more litigation cases to the workspace
  </p>
</div>



            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="py-2 px-4">Workspace</th>
                    <th className="py-2 px-4">Client</th>
                    <th className="py-2 px-4">Opponent</th>
                    <th className="py-2 px-4">Case Type</th>
                    <th className="py-2 px-4">Area of Law</th>
                    <th className="py-2 px-4">Timeline</th>
                    <th className="py-2 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkspaces.map((workspace, index) => (
 <WorkspaceTableRow
  key={index}
  id={workspace.id}
  title={workspace.title}
  subtitle={workspace.subtitle}
  contracts={workspace.contracts}
  client={workspace.client}
  opponent={workspace.opponent}
  caseType={workspace.caseType}
  area={workspace.area}
  timeline={workspace.timeline}
  slug={workspace.slug}
  handleDelete={handleDelete}
/>


))}

                </tbody>
              <tr>
  <td colSpan={7}>
    <div
      onClick={() => setIsCaseModalOpen(true)} // 👈 this is what makes it work
      className="w-[999px] h-[42px] bg-[#00212C] rounded-[8px] mx-auto mt-4 flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition"
      style={{
        boxShadow: "1px 1px 4px 1px #C1B8B840",
      }}
    >
      <AiOutlineFileAdd className="w-[24px] h-[24px] text-white" />
      <p className="text-white font-[500] text-[12px] font-poppins tracking-[0] leading-[100%]">
        Upgrade to add more litigation cases to the workspace
      </p>
    </div>
  </td>
</tr>





              </table>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <CreateWorkspaceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={() => {}}
      />

      <CaseDetailsModal
        isOpen={isCaseModalOpen}
        onClose={() => setIsCaseModalOpen(false)}
        onSave={fetchWorkspaces}
      />
    </div>
  );
}
