export const habitColors = [
  "#ef4444",
  "#22c55e",
  "#3b82f6",
  "#eab308",
  "#f97316",
  "#a855f7",
  "#64748b",
];

export const nextStatus = (currentStatus) => {
  switch (currentStatus) {
    case "COMPLETE":
      return "PLANNED_SKIP";
    case "PLANNED_SKIP":
      return "SKIPPED";
    default:
      return "COMPLETE";
  }
};

export const styleStatus = (currentStatus, color) => {
  switch (currentStatus) {
    case "COMPLETE":
      return {
        background: `linear-gradient(#ffffff , ${color} 100%)`,
        borderRadius: "50%",
        border: `2px solid ${color}`,
      };
    case "PLANNED_SKIP":
      return {
        background: `radial-gradient(circle, ${color}20 50%, ${color} 150%)`,
        borderRadius: "50%",
      };
    default:
      return {};
  }
};
