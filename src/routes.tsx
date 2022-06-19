import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

const AppRoutes = () => (
  <Routes>
    <Route path='/:urlPage' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/' element={<Navigate to="/1" replace />} />
  </Routes>
);

export default AppRoutes;
