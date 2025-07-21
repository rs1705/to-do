import {
  doc,
  collection,
  getDocs,
  deleteDoc,
  setDoc,
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

export const removeTodoFromFirestore = async (uid, todoId) => {
  const todoRef = doc(db, "todoData", uid, "userTodos", todoId);
  await deleteDoc(todoRef);
};

export const updateTodoToFireStore = async (uid, todoId, updatedTodo) => {
  const todoRef = doc(db, "todoData", uid, "userTodos", todoId);
  await setDoc(todoRef, updatedTodo, { merge: true });
};
