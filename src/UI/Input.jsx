const Input = ({ title, style, labelled = false, type = "text", ...props }) => {
  let styles = "bg-slate-200 py-1 px-2 rounded flex-9/12 ";
  styles += style ? style : "";
  return (
    <div className="flex">
      {labelled ? (
        <label className="flex-2/12 py-1" htmlFor={title}>
          {title}
        </label>
      ) : (
        ""
      )}
      <input type={type} placeholder={title} className={styles} {...props} />
    </div>
  );
};

export default Input;
