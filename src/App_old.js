const App = () => {
  // const [list, setList] = useState(todos);
  // const [item, setItem] = useState("");
  // const [msg, setMsg] = useState("");
  // const addHandler = () => {
  //   if (item.trim() === "") {
  //     setMsg("Please enter a valid item.");
  //     return;
  //   } else {
  //     setMsg("");
  //     const todoItem = {
  //       id: "id" + Math.random().toString(16).slice(2),
  //       createdBy: "Admin",
  //       createdAt: new Date().toLocaleString(),
  //       title: item,
  //       complete: false,
  //     };
  //     setList((prevList) => {
  //       return [...prevList, todoItem];
  //     });
  //   }
  //   setItem("");
  // };
  // const removeItem = (itemId) => {
  //   const removedItemList = list.filter((item) => item.id != itemId);
  //   setList(removedItemList);
  // };
  // const completeItem = (itemId) => {
  //   const newList = list.map((item) =>
  //     item.id === itemId ? { ...item, complete: !item.complete } : item
  //   );
  //   setList(newList);
  // };
  // const editItem = (itemId, newTitle) => {
  //   const newList = list.map((item) =>
  //     item.id === itemId ? { ...item, title: newTitle } : item
  //   );
  //   setList(newList);
  // };
  // return (
  // <div>
  //   <Header />
  //   {/* <Route path="/login" element={<Login />} /> */}
  //   <InputItem addHandler={addHandler} item={item} setItem={setItem} />
  //   {msg && <div className="text-red-500 text-center mt-2">{msg}</div>}
  //   <div>
  //     <TodoList
  //       items={list}
  //       onRemove={removeItem}
  //       onEdit={editItem}
  //       onComplete={completeItem}
  //     />
  //   </div>
  // </div>
  //);
};

const todos = [
  {
    id: "1",
    title: "Build Todo App",
    description: "Create a complete todo app using React",
    isCompleted: false,
    priority: "high",
    dueDate: "2025-07-21",
    createdAt: "2025-07-17T10:00:00.000Z",
    tags: ["react", "frontend", "project", "context-api"],
    subtasks: [
      { id: "1-1", title: "Set up project structure", isCompleted: true },
      { id: "1-2", title: "Create context and reducer", isCompleted: false },
    ],
  },
];

const updatedDetails = {
  title: "New title",
  description: "new Desc",
  dueDate: "x",
  tags: ["new", "tags"],
};
const a = [{ ...todos[0], ...updatedDetails }];

console.log(a);
