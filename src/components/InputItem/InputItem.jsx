const InputItem = ({addHandler,item,setItem}) => {
  return (
    <div>
        <input
          className="w-[52%] p-2 rounded mb-4  bg-gray-900 text-white font-semibold rounded-full"
          type="text"
          placeholder="Enter the list item..."
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />{" "}
        <button
          className="bg-gray-500 hover:bg-teal-600 font-bold text-white py-2 px-4 rounded-full"
          onClick={addHandler}
        >
          +
        </button>
      </div>
  )
}

export default InputItem