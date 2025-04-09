import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Home } from "./pages/Home/Home";
import { Login } from "./components/Login/Login";
import { AuthType } from "./components/Login/Login.types";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={<Login componentType={AuthType.SIGNIN} />}
        />
        <Route
          path="/signup"
          element={<Login componentType={AuthType.SIGNUP} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
