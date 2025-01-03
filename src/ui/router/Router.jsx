import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/credintials/Login";
import Home from "../pages/home/Home";

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/game" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default Routers;
