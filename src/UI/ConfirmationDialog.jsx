import { createPortal } from "react-dom";
import { useEffect } from "react";
import Button from "./Button";
const ConfirmationDialog = ({ onConfirm, onClose }) => {
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
        <h3 className="text-2xl text-center font-bold">Delete the task?</h3>
        <br />
        <div className="flex justify-center">
          <Button
            title="Cancel"
            onClick={onClose}
            style="mx-1 bg-transparent text-slate-900 hover:bg-transparent hover:text-slate-400 "
          />
          <Button title="Confirm" onClick={onConfirm} style="mx-1" />
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ConfirmationDialog;
