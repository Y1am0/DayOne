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

export const styleStatus = (currentStatus) => {
  switch (currentStatus) {
    case "COMPLETE":
      return "bg-blue-500 rounded-full";
    case "PLANNED_SKIP":
      return "border border-blue-500 rounded-full ";
    default:
      return "";
  }
};
