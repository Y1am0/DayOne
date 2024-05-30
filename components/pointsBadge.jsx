const PointsBadge = ({ points }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center bg-white bg-opacity-50 rounded-full w-12 h-12">
        <p className="text-black font-bold text-lg">{points}</p>
      </div>
    </div>
  );
};
