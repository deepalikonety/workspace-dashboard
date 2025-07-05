interface CaseInfoSidebarProps {
  client: string;
  opponent: string;
  section: string;
  timeline: string;
}

export default function CaseInfoSidebar({ client, opponent, section, timeline }: CaseInfoSidebarProps) {
  const info = [
    { label: "Client", value: client },
    { label: "Opponent", value: opponent },
    { label: "Section", value: section },
    { label: "Case Timeline", value: timeline },
  ];
  return (
    <div className="space-y-4">
      {info.map(({ label, value }) => (
        <div key={label}>
          <h4 className="text-sm font-medium text-gray-600 mb-1">{label}</h4>
          <p className="text-sm text-gray-800">{value}</p>
        </div>
      ))}
    </div>
  );
}
