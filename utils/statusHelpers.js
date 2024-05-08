// Utility function for Status Toggling

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

// Utility function for Status Style Toggling

export const styleStatus = (currentStatus, color) => {
  switch (currentStatus) {
    case "COMPLETE":
      return `${color} rounded-full`;
    case "PLANNED_SKIP":
      return `rounded-full border`;
    default:
      return "";
  }
};
