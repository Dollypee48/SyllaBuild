import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUser, FiInfo } from 'react-icons/fi';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    setTimeout(() => {
      navigate('/');  
    })        
  };

  return (
    <header className="bg-white shadow border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-amber-700 tracking-tight hover:opacity-90 transition-all duration-200"
          >
            SyllaBuild
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            {/* About Link - Visible to all users */}
            <Link
              to="/about"
              className="flex items-center text-sm font-medium text-gray-700 hover:text-amber-700 transition"
            >
              <FiInfo className="mr-1 text-lg" />
              About
            </Link>

            {currentUser ? (
              <>
                <span className="flex items-center text-sm font-medium text-gray-700">
                  <FiUser className="mr-2 text-lg text-amber-700" />
                  {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-sm text-gray-600 hover:text-red-600 font-medium transition"
                >
                  <FiLogOut className="mr-2 text-lg" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-amber-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-md transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;