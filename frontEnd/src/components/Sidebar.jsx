import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiBook, FiFileText } from 'react-icons/fi';

const Sidebar = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) return null;

  const navItems = [
    { path: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/editor', icon: <FiBook />, label: 'Course Editor' },
    { path: '/export', icon: <FiFileText />, label: 'Export' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-amber-700 tracking-tight mb-4">
          Menu
        </h2>
        <nav>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition 
                      ${
                        isActive
                          ? 'bg-amber-100 text-amber-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
