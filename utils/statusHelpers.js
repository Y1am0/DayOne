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

const calculateLuminance = (consecutiveDays) => {
  // Ensure the luminance value stays within the 5% to 100% range
  const luminance = Math.min(100, 5 + (consecutiveDays - 1) * (95 / 20));
  return luminance;
};

export const styleStatus = (currentStatus, color, consecutiveDays) => {
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
