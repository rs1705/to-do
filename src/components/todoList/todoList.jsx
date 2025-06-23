import TodoItem from "../todoItem/todoItem";
const TodoList = ({ items, onRemove, onEdit, onComplete }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 text-white">
      {items.length > 0 ? (
        items.map(
          (item, count = 1) => (
            count++,
            (
              <TodoItem
                key={item.id}
                item={item}
                count={count}
                onRemove={onRemove}
                onEdit={onEdit}
                onComplete={onComplete}
              />
            )
          )
        )
      ) : (
        <div>No items found</div>
      )}
    </div>
  );
};

export default TodoList;
