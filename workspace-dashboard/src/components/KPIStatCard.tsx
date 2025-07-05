import React from "react";

import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";

interface KPIStatCardProps {
  icon: React.ReactNode;
  count: number;
  label: string;
  trend: string;
  trendColor: "green" | "red";
}

const KPIStatCard: React.FC<KPIStatCardProps> = ({
  icon,
  count,
  label,
  trend,
  trendColor,
}) => {
  const TrendIcon =
    trendColor === "green" ? IoIosArrowUp :IoIosArrowDown;
  const colorClass =
    trendColor === "green" ? "text-green-500" : "text-red-500";

  return (
    <div
      className="relative bg-white border border-gray-200 shadow-sm p-4"
      style={{
        width: "220px",
        height: "130px",
        borderRadius: "10px",
        opacity: 1,
      }}
    >
      {/* Icon top-right */}
      <div className="absolute top-4 right-4 w-[36px] h-[36px] rounded-full bg-gray-100 flex items-center justify-center">
  <div className="w-[22px] h-[22px]">
    {icon}
  </div>
</div>


      {/* Label */}
      <div className="text-sm text-gray-600 mb-1 font-medium">{label}</div>

      {/* Count */}
      <div className="text-2xl font-bold text-gray-800">{count}</div>

      {/* Trend Info */}
      <div
        className={`flex items-center text-xs mt-1 gap-1 font-medium ${colorClass}`}
      >
        <TrendIcon className="text-sm" />
        <span>{trend} from last month</span>
      </div>
    </div>
  );
};

export default KPIStatCard;