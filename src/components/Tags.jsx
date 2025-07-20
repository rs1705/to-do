const Tags = ({ tagItems }) => {
  return (
    <p className="font-bold mt-5">
      <span className="text-slate-600 mr-2">Tags:</span>
      {tagItems.map((tag) => (
        <span
          key={tag}
          className="bg-amber-100 text-amber-500 px-2 py-1 mr-1 rounded-xl text-sm"
        >
          {tag.toUpperCase()}
        </span>
      ))}
    </p>
  );
};

export default Tags;
