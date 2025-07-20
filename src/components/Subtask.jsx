const Subtasks = ({ parentId, tasks, onFinishSubtask }) => {
  const SubtaskItem = ({ item, onFinish, idx }) => {
    const completeSubtaskHandler = () => {
      onFinish(parentId, item.id);
    };
    return (
      <li className="flex list-disc">
        <input
          type="checkbox"
          onChange={completeSubtaskHandler}
          checked={item.isCompleted}
          className=""
        />
        &nbsp;
        <span
          className={
            !item.isCompleted ? "flex-11/12" : "line-through flex-11/12"
          }
          key={item.id}
        >
          {idx}. {item.title}
        </span>
      </li>
    );
  };

  return (
    <div className="p-2 bg-slate-100 rounded-lg w-[100%]">
      <h3 className="font-bold  text-stone-800">Subtasks:</h3>
      <ol className="ml-2">
        {tasks.map((subtask, idx) => {
          return (
            <SubtaskItem
              key={subtask.id}
              item={subtask}
              onFinish={onFinishSubtask}
              idx={idx + 1}
            />
          );
        })}
      </ol>
    </div>
  );
};

export default Subtasks;
