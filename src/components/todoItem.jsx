import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import Subtasks from "./Subtask";
import { Check, SquarePen, X } from "lucide-react";
import NewSubtask from "./NewSubtask";
import Modal from "./Modal";
import Tags from "./Tags";

const TodoItem = ({ item }) => {
  console.log(item);
  const todoCtx = useContext(TodoContext);
  const setSelectedId = useContext(TodoContext).setSelectedId;

  const [editing, setEditing] = useState(false);

  const openModal = () => {
    setEditing(true);
  };
  const closeModal = () => {
    setEditing(false);
  };

  const removeTodoHandler = () => {
    let ans = confirm("Delete the item?");
    if (ans) {
      todoCtx.removeTodo(item.id);
      setSelectedId(null);
    }
  };

  const finishTodoHandler = () => {
    todoCtx.finishTodo(item.id);
  };

  let priorityStyle;
  if (item.priority === "High") {
    priorityStyle = "bg-red-200 text-red-600 rounded-md px-2 py-[0.8px]";
  } else if (item.priority === "Medium") {
    priorityStyle = "bg-yellow-200 text-yellow-600 rounded-md px-2 py-1";
  } else if (item.priority === "Low") {
    priorityStyle = "bg-lime-200 text-lime-600 rounded-md px-2 py-1";
  } else {
    priorityStyle = "";
  }

  let styles = item.isCompleted ? " line-through" : " ";

  return (
    <div className="ml-2">
      <p className="text-slate-600 font-bold text-sm">
        <span className={priorityStyle}>{item.priority}</span>
      </p>
      <div className="todo-title-container flex">
        <div className="inline-flex w-[90%] mt-1 font-bold">
          <h2 className={"text-slate-700 w-[100%] text-3xl" + styles}>
            {item.title}
          </h2>
        </div>

        {editing && item && <Modal todo={item} onClose={closeModal} />}

        <div className="inline-flex  justify-end">
          <button
            className="bg-slate-200 hover:bg-slate-300 hover:cursor-pointer rounded-full m-1 p-1"
            onClick={finishTodoHandler}
          >
            <Check />
          </button>
          <button
            className="bg-slate-200 hover:bg-slate-300 hover:cursor-pointer rounded-full m-1 p-1"
            onClick={openModal}
          >
            <SquarePen />
          </button>
          <button
            className="bg-slate-200 hover:bg-slate-300 hover:cursor-pointer rounded-full m-1 p-1"
            onClick={removeTodoHandler}
          >
            <X />
          </button>
        </div>
      </div>
      <div>
        <div className="todo-item-container mb-1">
          <p className="text-slate-600 mb-2 text-md ml-1">{item.description}</p>
          <Tags tagItems={item.tags} />
          <p className="text-slate-400 text-sm font-semibold mt-2 ml-1">
            Due: {item.dueDate}
          </p>
        </div>
        <div>
          <br />
          <NewSubtask
            parentId={item.id}
            id={item.id + item.subtasks.length + 1}
            onAddSubtask={todoCtx.addSubtask}
            onDisabled={item.isCompleted}
          />
          <br />
          {item.subtasks.length === 0 && (
            <p className="text-slate-400">There are no subtasks yet.</p>
          )}

          {item.subtasks && item.subtasks.length > 0 && (
            <Subtasks
              parentId={item.id}
              tasks={item.subtasks}
              onFinishSubtask={todoCtx.finishSubtask}
              onRemoveSubtask={todoCtx.removeSubtask}
              onEditSubtask={todoCtx.editSubtask}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
