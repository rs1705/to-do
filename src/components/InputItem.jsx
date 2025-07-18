import { Plus } from "lucide-react";
import { useContext, useRef } from "react";
import { TodoContext } from "../context/TodoContext";
const InputItem = () => {
  const todoCtx = useContext(TodoContext);
  const titleRef = useRef();
  const descRef = useRef();
  const addItemHandler = () => {
    const item = titleRef.current.value;
    if (item.trim().length === 0) {
      alert("Invalid entries are not allowed");
      return;
    }
    const todo = {
      id: "id_" + Math.random().toString(16).slice(2),
      title: item,
      createdAt: new Date().toISOString(),
      dueDate: "30 July 2025",
      priority: "high",
      subTasks: [],
    };
    todoCtx.addTodo(todo);
    titleRef.current.value = "";
  };
  return (
    <div className="flex-col rounded-2xl p-5">
      <div className="flex justify-center p-1">
        <input
          className="bg-slate-800 text-stone-100 pl-3 p-2 rounded-full w-[85%] text-md mb-1"
          type="text"
          ref={titleRef}
          placeholder="Title goes here..."
        />
      </div>
      <div className="flex justify-center p-1">
        <input
          className="bg-slate-800 text-stone-100 p-2 text-center rounded-full w-[20%] text-md mb-1"
          type="text"
          ref={descRef}
          placeholder="Description"
        />
        <input
          type="date"
          name="date"
          className="bg-slate-300 rounded-full m-1 p-2 text-center date-button"
        />
        <select
          className="bg-slate-300 rounded-full m-1 p-2 priority-button"
          name="Priority"
        >
          <option value="">{`--Priority--`}</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={addItemHandler}
        >
          <svg
            class="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default InputItem;
