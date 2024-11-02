import React, { useState } from "react";

const statusData = [
  {
    status: "Pending",
    mainColor: "#f1c21b",
    hoverColor: "#dab60d",
  },
  {
    status: "Completed",
    mainColor: "#0043ce",
    hoverColor: "#0033a0",
  },
  {
    status: "Cancelled",
    mainColor: "#da1e28",
    hoverColor: "#b81a22",
  },
  {
    status: "Confirmed",
    mainColor: "#24A148",
    hoverColor: "#1e8b3f",
  },
];

const ItemStatus = ({ inputStatus }) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusType = statusData.find((s) => s.status === inputStatus);
  if (!statusType) return null;

  return (
    <span
      className="p-1 rounded-md text-sm capitalize"
      style={{
        backgroundColor: isHovered
          ? statusType.hoverColor
          : statusType.mainColor,
        color: "white",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {statusType.status}
    </span>
  );
};

export default ItemStatus;
