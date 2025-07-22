import {
  doc,
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./Firebase";

export const fetchTodosFromFirestore = async (uid) => {
  const todosRef = collection(db, "todoData", uid, "userTodos");
  const snapshot = await getDocs(todosRef);
  const todos = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return todos;
};

//add a new todo to the Firestore database
export const addTodotoFirestore = async (uid, todo) => {
  const todoRef = doc(db, "todos", uid, "userTodos", todo.id);
  await setDoc(todoRef, todo, { merge: true });
};

//update an existing todo in the Firestore database
export const updateTodoToFirestore = async (uid, todoId, updatedTodo) => {
  const todoRef = doc(db, "todoData", uid, "userTodos", todoId);
  if (updatedTodo !== null) {
    await setDoc(todoRef, updatedTodo, { merge: true });
  } else {
    const status = (await getDoc(todoRef)).data().isCompleted;
    await updateDoc(todoRef, { isCompleted: !status });
  }
};

//remove a todo from the Firestore database
export const removeTodoFromFirestore = async (uid, todoId) => {
  const todoRef = doc(db, "todoData", uid, "userTodos", todoId);
  await deleteDoc(todoRef);
};

//add a new subtask to a parent todo in the Firestore database
export const addSubtaskToFirestore = async (uid, parentId, subtask) => {
  const parentTodoRef = doc(db, "todoData", uid, "userTodos", parentId);
  await updateDoc(parentTodoRef, { subtasks: arrayUnion(subtask) });
};

//complete a subtask in a parent todo in the Firestore database
export const updateSubtaskToFirestore = async (
  uid,
  parentId,
  subtaskId,
  data
) => {
  const parentTodoRef = doc(db, "todoData", uid, "userTodos", parentId);
  const subtasks = (await getDoc(parentTodoRef)).data().subtasks;
  let updatedSubtasks;
  if (data !== null) {
    updatedSubtasks = subtasks.map((subtask) => {
      return subtask.id === subtaskId ? { ...subtask, ...data } : subtask;
    });
  } else {
    updatedSubtasks = subtasks.map((subtask) => {
      return subtask.id === subtaskId
        ? { ...subtask, isCompleted: !subtask.isCompleted }
        : subtask;
    });
  }
  await updateDoc(parentTodoRef, { subtasks: updatedSubtasks });
};

//remove a subtask from a parent todo in the Firestore database
export const removeSubtaskFromFirestore = async (uid, parentId, subtaskId) => {
  const parentTodoRef = doc(db, "todoData", uid, "userTodos", parentId);
  const subtasks = (await getDoc(parentTodoRef)).data().subtasks;
  const updatedSubtasks = subtasks.filter(
    (subtask) => subtask.id !== subtaskId
  );
  await updateDoc(parentTodoRef, { subtasks: updatedSubtasks });
};
