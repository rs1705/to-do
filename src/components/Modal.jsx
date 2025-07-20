import { createPortal } from "react-dom";
import { useEffect } from "react";
import NewTodo from "./NewTodo";

const Modal = ({ todo, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-6 w-[100%] max-w-lg">
        <h3 className="text-2xl text-center font-bold">Update details</h3>
        <p className="text-slate-600 text-center mb-3">
          Enter new details for the todo below
        </p>
        <NewTodo method="dialog" todo={todo} onClose={onClose} />
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
