import { createTheme, ThemeProvider, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const theme = createTheme({
    palette: { mode: "dark", primary: { main: "#edce5b", light: "#fff261", dark: "#a08b3d" } },
    typography: { fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif' },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography variant="h1" children="Hi! Lorena" />
    </ThemeProvider>
  );
};

export default App;
