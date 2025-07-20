const Subtasks = ({ parentId, tasks, onFinishSubtask }) => {
  const SubtaskItem = ({ item, onFinish }) => {
    const completeSubtaskHandler = () => {
      console.log(parentId + " " + item.id);
      onFinish(parentId, item.id);
    };
    return (
      <p className="flex">
        <input
          type="checkbox"
          onChange={completeSubtaskHandler}
          checked={item.isCompleted}
        />
        <span
          className={!item.isCompleted ? "ml-2 mt-1" : "ml-2 mt-1 line-through"}
          key={item.id}
        >
          {item.title}
        </span>
      </p>
    );
  };

  return (
    <div className="p-2 bg-slate-100 rounded-lg w-[100%]">
      <h3 className="font-bold  text-stone-800">Subtasks:</h3>
      <ol className="ml-2">
        {tasks.map((subtask) => {
          return (
            <SubtaskItem
              key={subtask.id}
              item={subtask}
              onFinish={onFinishSubtask}
            />
          );
        })}
      </ol>
    </div>
  );
};

export default Subtasks;
