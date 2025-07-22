import ProgressBar from "../UI/ProgressBar";
import SubtaskItem from "./SubtaskItem";
const Subtasks = ({
  parentId,
  tasks,
  onFinishSubtask,
  onRemoveSubtask,
  onEditSubtask,
}) => {
  const completed = tasks.filter((task) => task.isCompleted).length;
  const progressInc = Math.floor((completed / tasks.length) * 100);
  return (
    <div className="p-2 bg-slate-100 rounded-lg w-[100%]">
      <div className="flex items-center">
        <div className="flex-4/10">
          <h3 className="text-slate-800 font-bold text-md">
            Subtasks {completed}/{tasks.length}
          </h3>
        </div>
        <ProgressBar className="flex-10/12" percentage={progressInc} />
      </div>
      <div className="mb-2 w-full"></div>
      {tasks.map((subtask, idx) => {
        return (
          <SubtaskItem
            key={parentId + subtask.id}
            item={subtask}
            onFinish={onFinishSubtask}
            onRemove={onRemoveSubtask}
            onEdit={onEditSubtask}
            idx={idx + 1}
            parentId={parentId}
          />
        );
      })}
    </div>
  );
};

export default Subtasks;
