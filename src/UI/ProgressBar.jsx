const ProgressBar = ({ percentage }) => {
  const getBarColor = (percent) => {
    if (percent < 30) return "bg-red-500";
    if (percent < 50) return "bg-amber-400";
    if (percent < 70) return "bg-lime-400";
    if (percent <= 100) return "bg-green-500";
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner relative">
        <div
          className={`h-full ${getBarColor(
            percentage
          )} transition-all duration-250 ease-in-out`}
          style={{ width: `${percentage}%` }}
        >
          <span className="text-black text-xs font-medium absolute inset-0 flex items-center justify-center">
            {percentage}% subtasks complete
          </span>
        </div>
      </div>
    </div>
  );
};
export default ProgressBar;
