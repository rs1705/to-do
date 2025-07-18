import React from "react";

const Input = ({ title, style, ...props }) => {
  let styles = "bg-slate-200 py-1 px-2 rounded ";
  styles += style ? style : "";
  return <input className={styles} placeholder={title} {...props} />;
};

export default Input;
