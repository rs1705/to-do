const Button = ({ title, style, ...props }) => {
  let styles =
    "bg-slate-400 hover:bg-slate-600 hover:cursor-pointer hover:text-gray-100 py-1 px-2 rounded text-slate-900 ";
  styles += style ? style : "";
  return (
    <button className={styles} {...props}>
      {title}
    </button>
  );
};

export default Button;
