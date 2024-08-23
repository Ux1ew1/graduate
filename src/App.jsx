import "./App.css";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/router/AppRouter.jsx";
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
