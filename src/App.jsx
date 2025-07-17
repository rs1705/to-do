import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import TodoList from "./components/todoList";
import InputItem from "./components/InputItem";
import todos from "./demoTodos";

const App = () => {
  const [list, setList] = useState(todos);
  const [item, setItem] = useState("");
  const [msg, setMsg] = useState("");

  const addHandler = () => {
    if (item.trim() === "") {
      setMsg("Please enter a valid item.");
      return;
    } else {
      setMsg("");
      const todoItem = {
        id: "id" + Math.random().toString(16).slice(2),
        createdBy: "Admin",
        createdAt: new Date().toLocaleString(),
        title: item,
        complete: false,
      };
      setList((prevList) => {
        return [...prevList, todoItem];
      });
    }
    setItem("");
  };

  const removeItem = (itemId) => {
    const removedItemList = list.filter((item) => item.id != itemId);
    setList(removedItemList);
  };
  const completeItem = (itemId) => {
    const newList = list.map((item) =>
      item.id === itemId ? { ...item, complete: !item.complete } : item
    );
    setList(newList);
  };

  const editItem = (itemId, newTitle) => {
    const newList = list.map((item) =>
      item.id === itemId ? { ...item, title: newTitle } : item
    );
    setList(newList);
  };

  return (
    <div>
      <Header />

      {/* <Route path="/login" element={<Login />} /> */}

      <InputItem addHandler={addHandler} item={item} setItem={setItem} />
      {msg && <div className="text-red-500 text-center mt-2">{msg}</div>}
      <div>
        <TodoList
          items={list}
          onRemove={removeItem}
          onEdit={editItem}
          onComplete={completeItem}
        />
      </div>
    </div>
  );
};

export default App;
