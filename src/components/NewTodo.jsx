import Input from "../UI/Input";
import Button from "../UI/Button";
import { useRef } from "react";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const NewTodo = ({ method, todo, onClose }) => {
  const todoCtx = useContext(TodoContext);
  const titleRef = useRef();
  const desRef = useRef();
  const dateRef = useRef();
  const priorityRef = useRef();
  const tagsRef = useRef();

  const onCancelClick = () => {
    if (method === "dialog") {
      onClose();
    } else {
      todoCtx.setSelectedId(null);
    }
  };
  const createTodoHandler = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = desRef.current.value;
    const dueDate = dateRef.current.value;
    const priority = priorityRef.current.value;
    const tags = tagsRef.current.value.split(",");

    if (!title || !dueDate) {
      alert("Empty values are not allowed.");
      return;
    }

    if (method === "dialog") {
      const updatedItem = {
        title,
        description,
        dueDate,
        priority,
        tags,
      };
      todoCtx.editTodo(todo.id, updatedItem);
      onClose();
    } else {
      const newItemId = "id_" + Math.random().toString(16).slice(2);
      const newItem = {
        id: newItemId,
        title,
        description,
        isCompleted: false,
        dueDate,
        priority,
        createdAt: new Date().toISOString(),
        tags,
        subtasks: [],
      };
      todoCtx.addTodo(newItem);
      todoCtx.setSelectedId(newItemId);
    }
  };
  return (
    <form method={method ? method : ""}>
      <div className="flex flex-col">
        <Input
          labelled
          title="Title"
          defaultValue={todo ? todo.title : ""}
          style="mb-2"
          ref={titleRef}
          required
        />
        <Input
          labelled
          title="Description"
          defaultValue={todo ? todo.description : ""}
          style="mb-2"
          ref={desRef}
          required
        />
        <Input
          type="date"
          labelled
          title="Date"
          defaultValue={todo ? todo.dueDate : ""}
          style="mb-2"
          ref={dateRef}
          required
        />
        <div className="flex justify-between mb-2">
          <label className="flex-2/12 py-1" htmlFor="Priority">
            Priority
          </label>
          <select
            className="flex-9/12 bg-slate-200 rounded py-1 px-2 "
            name="priority"
            ref={priorityRef}
            defaultValue={todo ? todo.priority : ""}
          >
            <option value="">{`--Priority--`}</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <Input
          type="text"
          labelled
          title="Tags"
          defaultValue={todo ? todo.tags : ""}
          style="mb-2"
          ref={tagsRef}
        />

        <div className="flex justify-end mt-2">
          <Button
            title="Cancel"
            onClick={onCancelClick}
            style="bg-transparent text-slate-900 hover:bg-transparent hover:text-slate-400"
          />
          <Button
            title={method === "dialog" ? "Update details" : "+ Add task"}
            onClick={createTodoHandler}
          />
        </div>
      </div>
    </form>
  );
};

export default NewTodo;
