const Button = ({ title, style, ...props }) => {
  let styles =
    "bg-slate-500 text-gray-100 hover:cursor-pointer hover:bg-slate-600 py-1 px-2 rounded-md ";
  styles += style ? style : "";
  return (
    <button className={styles} {...props}>
      {title}
    </button>
  );
};

export default Button;
