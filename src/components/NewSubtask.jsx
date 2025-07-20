import { useRef } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

const NewSubtask = ({ id, parentId, onAddSubtask }) => {
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
    <div className="flex mb-4">
      <Input title="Enter subtask..." style="mr-2" ref={subTaskRef} />
      <Button title="+ Add " onClick={addSubtaskHandler} />
    </div>
  );
};

export default NewSubtask;
