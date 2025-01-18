import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full">
      <nav className="bg-blue-200 p-4 shadow-md rounded-md mb-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-xl font-bold">
            <span className="hidden sm:block">M-Event</span>
            <span className="block sm:hidden">ME</span>
          </div>
          <div className="ml-1 items-center justify-center ">
            <div className="relative text-gray-600 flex-1 mx-4">
              <input
                type="text"
                className=" bg-white h-10 px-5 pr-10 rounded-full text-sm w-full  focus:outline-none"
                placeholder="Search events…"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-4"
              >
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="text-white flex items-center space-x-4">
            <Link to="/eventscreationpage">
              <button className="bg-blue-950 p-1 rounded-md">CreateEvent</button>
            </Link>
            <FaUserCircle size={24} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
