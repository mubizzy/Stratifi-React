import "./App.css";
import "animate.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SubscribeContent from "./pages/SubscribeContent";
import Mailchimp from "./pages/SubscribeContent";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/get-content" element={<Mailchimp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
