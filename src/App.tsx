import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import {PopulationProvider} from './context'

export default function App() {
  return (
    <Router>
      <PopulationProvider>
        <AppRoutes />
      </PopulationProvider>
    </Router>
  );
}
