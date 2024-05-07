// Component to render the habits column
export const HabitsColumn = ({ habits }) => {
  return (
    <div className="flex flex-col w-28 z-10 flex-shrink-0 text-lg pl-4 font-light">
      <p className="h-16 flex items-center">Habits</p>
      {habits.map((habit) => (
        <p key={habit.id} className="text-sm h-16 flex items-center">
          {habit.title.length > 18
            ? habit.title.substr(0, 18) + "\u2026"
            : habit.title}
        </p>
      ))}
    </div>
  );
};
