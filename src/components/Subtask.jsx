const Subtask = ({ tasks }) => {
  const SubtaskItem = ({ item }) => {
    return (
      <p className="flex">
        <input type="checkbox" />
        <span className="ml-2 mt-1" key={item.id}>
          {item.title}
        </span>
      </p>
    );
  };

  return (
    <div className="mb-7 p-2 bg-slate-50 rounded-lg w-[90%]">
      <h3 className="font-bold  text-stone-800">Subtasks:</h3>
      <ol className="ml-5 list-decimal">
        {tasks.map((subtask) => {
          return <SubtaskItem key={subtask.id} item={subtask} />;
        })}
      </ol>
    </div>
  );
};

export default Subtask;
