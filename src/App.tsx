import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { PopulationProvider } from "./context";
import {StyledEngineProvider} from '@mui/material';

export default function App() {
  return (
    <Router>
      <PopulationProvider>
        <StyledEngineProvider injectFirst>
          <AppRoutes />
        </StyledEngineProvider>
      </PopulationProvider>
    </Router>
  );
}
