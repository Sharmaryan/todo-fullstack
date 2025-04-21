import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";

export const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  return (
    <nav className="bg-white shadow-md py-4 px-6 rounded-b-2xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">MyTodoApp</h1>
        {!isAuthPage && (
          <div className="space-x-4">
            <button
              className="text-gray-700 hover:text-blue-500 transition font-medium"
              onClick={() => logout(navigate)}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
