const Habits = () => {
  let categories = [];

  return (
    <div className="h-full flex place-content-center flex-col m-auto">
      {categories.length > 0 && "content here"}
      <div className="flex flex-col gap-4">
        <button className="bg-white p-4 text-black rounded-lg">
          New Category
        </button>
      </div>
    </div>
  );
};
export default Habits;
