import { useRef } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

const NewSubtask = () => {
  const subTaskRef = useRef();
  return (
    <div className="ml-2">
      <Input title="Enter subtask..." style="mr-2" />
      <Button title="+ Add " style="mr-2" />
    </div>
  );
};

export default NewSubtask;
