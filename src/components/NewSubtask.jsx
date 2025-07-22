import { useRef } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

const NewSubtask = ({ id, parentId, onAddSubtask, onDisabled }) => {
  const subTaskRef = useRef();

  const addSubtaskHandler = () => {
    const subtaskTitle = subTaskRef.current.value;
    if (subtaskTitle.trim().length > 0) {
      const subtask = {
        id,
        title: subtaskTitle,
        isCompleted: false,
      };
      onAddSubtask(parentId, subtask);
      subTaskRef.current.value = "";
    }
  };
  return (
    <div className="flex">
      <Input
        title="Enter subtask..."
        style="mr-2"
        ref={subTaskRef}
        disabled={onDisabled}
      />
      <Button
        title="+ Add "
        onClick={addSubtaskHandler}
        disabled={onDisabled}
      />
    </div>
  );
};

export default NewSubtask;
