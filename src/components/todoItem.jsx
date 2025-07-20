import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import Subtasks from "./Subtask";
import { SquarePen, X } from "lucide-react";
import NewSubtask from "./NewSubtask";
import Modal from "./Modal";

const TodoItem = ({ item }) => {
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
  return (
    <div className="ml-2">
      <div className="todo-title-container flex">
        <div className="inline-flex w-[90%] mt-1 font-bold">
          <h2 className="text-slate-700 w-[100%] text-3xl">{item.title}</h2>
        </div>

        {editing && item && <Modal todo={item} onClose={closeModal} />}

        <div className="inline-flex  justify-end">
          <button
            className="bg-slate-200 hover:bg-slate-300 hover:cursor-pointer rounded-full m-1 p-1"
            onClick={openModal}
          >
            <SquarePen />
          </button>
          <button
            className="bg-slate-100 hover:bg-slate-300 hover:cursor-pointer rounded-full m-1 p-1"
            onClick={removeTodoHandler}
          >
            <X />
          </button>
        </div>
      </div>
      <div>
        <div className="todo-item-container pt-0 pb-0">
          <p className="text-slate-800">{item.description}</p>
          <p className="text-slate-400">Due: {item.dueDate}</p>
          <p className="text-slate-600 font-semibold mt-2">
            <span>Tags: </span>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="bg-amber-100 text-amber-500 px-2 py-1 mr-1 rounded-xl text-sm"
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </p>
        </div>
        <div>
          <br />
          <NewSubtask
            parentId={item.id}
            id={item.id + item.subtasks.length + 1}
            onAddSubtask={todoCtx.addSubtask}
          />
          {item.subtasks.length === 0 && (
            <p className="text-amber-500 font-semibold">
              There are no subtasks yet.{" "}
            </p>
          )}
          {item.subtasks && item.subtasks.length > 0 && (
            <Subtasks
              parentId={item.id}
              tasks={item.subtasks}
              onFinishSubtask={todoCtx.finishSubtask}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
