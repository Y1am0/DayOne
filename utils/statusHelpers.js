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

// export const styleStatus = (currentStatus, color) => {
//   switch (currentStatus) {
//     case "COMPLETE":
//       return { backgroundColor: color, borderRadius: "50%" };
//     case "PLANNED_SKIP":
//       return { borderRadius: "50%", border: "2px solid", borderColor: color };
//     default:
//       return {};
//   }
// };

export const styleStatus = (currentStatus, color) => {
  switch (currentStatus) {
    case "COMPLETE":
      return {
        background: `linear-gradient(#fff 0%, ${color} 100%)`,
        borderRadius: "50%",
        border: `2px solid ${color}`,
      };
    case "PLANNED_SKIP":
      return {
        background: `radial-gradient(circle, #ffffff20 50%, ${color} 150%)`,
        borderRadius: "50%",
      };
    default:
      return {};
  }
};
