import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import Subtask from "./Subtask";
import { ArrowDown, ArrowUp, Check, Pen, PenTool } from "lucide-react";
import NewSubtask from "./NewSubtask";

const TodoItem = ({ count, item }) => {
  const todoCtx = useContext(TodoContext);
  const [hidden, setHidden] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);

  const toggleitemHandler = () => {
    setHidden((prev) => !prev);
  };

  const toggleEditHandler = () => {
    if (editing) {
      // Only try to save if we're leaving edit mode
      const trimmed = newTitle.trim();

      if (trimmed.length > 0 && trimmed !== item.title) {
        todoCtx.editTodo(item.id, trimmed);
      }

      setEditing(false);
    } else {
      // We're entering edit mode, so sync current title
      setNewTitle(item.title);
      setEditing(true);
    }
  };

  const toggleRemoveHandler = () => {
    console.log(item.id);
  };

  const completeTodoHandler = () => {
    todoCtx.starTodo(item.id);
    console.log(todoCtx.todos);
  };

  return (
    <div className="">
      <div className="todo-title-container flex p-2">
        <div className="inline-flex w-[90%] mt-1 font-bold">
          <h2 className="text-slate-600 w-[100%] text-3xl">
            {editing ? (
              <input
                type="text"
                name="title-edit"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="border-1 bg-stone-100 focus:bg-stone-300"
              />
            ) : (
              <span
                className={todoCtx.todos.starred ? "bg-slate-200" : undefined}
              >
                {item.title}
              </span>
            )}
          </h2>
        </div>
        <div className="inline-flex  justify-end">
          <button
            className="bg-stone-100 hover:bg-slate-400 rounded-full m-1 p-1"
            onClick={toggleEditHandler}
          >
            {!editing ? <PenTool /> : <Check />}
          </button>
          <button
            className="bg-stone-100 hover:bg-slate-400 rounded-full m-1 p-1"
            onClick={toggleRemoveHandler}
          ></button>
        </div>
      </div>
      <div>
        <div className="todo-item-container pl-2 pt-0 pb-0">
          <p className="text-slate-500">Due: {item.dueDate}</p>
          <br />
          <p className="text-slate-900">{item.description}</p>
        </div>
        <div>
          <NewSubtask />
          {item.subtasks && item.subtasks.length > 0 && (
            <Subtask tasks={item.subtasks} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
