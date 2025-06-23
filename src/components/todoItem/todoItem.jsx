import { useState } from "react";

const TodoItem = ({ item, count, onRemove, onEdit, onComplete }) => {
  const [newText, setNewText] = useState(item.title);
  const [isEditing, setIsEditing] = useState(false);
  const editBtn =
    "bg-gray-500 hover:bg-orange-500  text-white py-2 px-3 rounded-full mb-1 mr-2";
  const deleteBtn =
    "bg-gray-500 hover:bg-red-500  text-white py-2 px-3 rounded-full mr-2";
  const completeBtn =
    "bg-gray-500 hover:bg-green-500  text-white py-2 px-3 rounded-full mr-2";

  const onEditClick = (id) => {
    setIsEditing(!isEditing);
    if (newText.length > 0) {
      onEdit(id, newText);
    } else {
      alert("Empty values are not allowed. Please try again.");
    }
  };
  const onDeleteClick = (id) => {
    onRemove(id);
  };
  const onCompleteClick = (id) => {
      onComplete(id)
  };

  return (
    <div className="flex items-right justify-between w-[75%] mb-2 px-2 py-2 bg-gray-800 rounded-full shadow-md">
        <span className="font-bold p-2">{count}.</span>
      {!isEditing ? (
        <span className={!item.complete?"font-bold p-2":"font-bold p-2 text-white-500 striked"}>{item.title}</span>
      ) : (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className={isEditing ? "editing" : null}
        />
      )}
      <div>
        <button className={editBtn} onClick={() => onEditClick(item.id)}>
          {!isEditing ? "Edit" : "Save"}
        </button>
        <button className={deleteBtn} onClick={() => onDeleteClick(item.id)}>
          Delete
        </button>
        <button
          className={completeBtn}
          onClick={() => onCompleteClick(item.id)}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
