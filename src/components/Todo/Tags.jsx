const Tags = ({ tagItems }) => {
  return (
    <p className="font-semibold">
      {tagItems.map((tag) => (
        <span
          key={tag}
          className="bg-sky-100 text-sky-500 px-2 py-0.5 mr-1 rounded-xl text-sm font-semibold"
        >
          {tag.toUpperCase()}
        </span>
      ))}
    </p>
  );
};

export default Tags;
