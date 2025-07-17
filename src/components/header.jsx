import { Link } from "react-router";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-2">
      <h1 className="text-2xl text-white">Todo</h1>
      <button className="bg-gray-500 hover:bg-sky-500 font-bold text-white rounded-full mr-2">
        <Link
          to="/login"
          className="bg-gray-500 hover:bg-sky-500 font-bold text-white rounded-full mr-2"
        >
          Login
        </Link>
      </button>
    </div>
  );
};

export default Header;
