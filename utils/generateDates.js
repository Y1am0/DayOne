// Utility function to generate dates array

export const generateDates = (daysToShow) => {
  const today = new Date();
  return Array.from({ length: daysToShow }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - i);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate().toString().padStart(2, "0"),
      fullDate: date.toISOString(),
      isToday:
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    };
  }).reverse();
};
