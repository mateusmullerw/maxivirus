import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import UserDetails from "./pages/UserDetails/UserDetails";

const AppRoutes = () => (
  <Routes>
    <Route path='/:urlPage' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/user/:id' element={<UserDetails />} />
    <Route path='/' element={<Navigate to="/1" replace />} />
  </Routes>
);

export default AppRoutes;
