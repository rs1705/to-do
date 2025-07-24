import { useRef, useState } from "react";

import { Check, SquarePen, X } from "lucide-react";
import Input from "../UI/Input";

const SubtaskItem = ({ item, onFinish, idx, onRemove, onEdit, parentId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef();

  const completeSubtaskHandler = () => {
    onFinish(parentId, item.id);
  };

  const removeSubtaskHandler = () => {
    onRemove(parentId, item.id);
  };

  const editSubtaskHandler = () => {
    if (isEditing) {
      const newTitle = titleRef.current.value;
      if (newTitle && newTitle !== item.title)
        onEdit(parentId, item.id, { title: newTitle });
    }
    setIsEditing((prev) => !prev);
  };
  return (
    <li className="flex items-center bg-slate-200 rounded-lg p-1 hover:cursor-pointer mb-2">
      <input
        type="checkbox"
        onChange={completeSubtaskHandler}
        checked={item.isCompleted}
        className="hover:cursor-pointer mr-2 w-5 h-5 accent-slate-500 rounded-full"
      />
      <span
        className={!item.isCompleted ? "flex-11/12" : "line-through flex-11/12"}
        key={item.id}
      >
        {!isEditing ? (
          <span>
            {idx}.&nbsp;{item.title}
          </span>
        ) : (
          <span>
            <Input
              type="text"
              ref={titleRef}
              defaultValue={item.title}
              style="border-2 border-black-100"
            />
          </span>
        )}
      </span>
      <div className="inline-flex  justify-end">
        <button
          className="bg-slate-50 hover:bg-slate-300 hover:cursor-pointer rounded-full m-1 p-1"
          onClick={editSubtaskHandler}
          disabled={item.isCompleted}
        >
          {!isEditing ? <SquarePen /> : <Check />}
        </button>
        <button
          className="bg-slate-50 hover:bg-slate-300 hover:cursor-pointer rounded-full m-1 p-1"
          onClick={removeSubtaskHandler}
        >
          <X />
        </button>
      </div>
    </li>
  );
};
export default SubtaskItem;
