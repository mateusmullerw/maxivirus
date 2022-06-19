import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { PopulationProvider } from "./context";
import {StyledEngineProvider, ThemeProvider, createTheme} from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6359f9',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: '#2b223d',
      secondary: '#80798b',
      disabled: 'rgba(128,121,139,0.6)',
    },
    success: {
      main: '#159570',
    },
    error: {
      main: '#f4365d',
    },
    background: {
      default: '#f1f5f8',
    },
    divider: 'rgba(43,34,61,0.15)',
  },
});

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <PopulationProvider>
        <StyledEngineProvider injectFirst>
          <AppRoutes />
        </StyledEngineProvider>
      </PopulationProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;