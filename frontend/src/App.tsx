import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Home } from "./pages/Home/Home";
import { Login } from "./components/Login/Login";
import { AuthType } from "./components/Login/Login.types";
import { Navbar } from "./components/Navbar/Navbar";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Login componentType={AuthType.SIGNIN} />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Login componentType={AuthType.SIGNUP} />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
