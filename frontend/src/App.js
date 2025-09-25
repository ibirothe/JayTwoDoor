import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/Auth/Login";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={<h1>Register</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
