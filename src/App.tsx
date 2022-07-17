import { Container, createTheme, Paper, ThemeProvider, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const theme = createTheme({
    palette: { mode: "dark", primary: { main: "#edce5b", light: "#fff261", dark: "#a08b3d" } },
    typography: { fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif' },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Paper elevation={5} sx={{ p: 2, my: 3 }}>
          <Typography variant="h1" children="Novo Hinário Adventista" />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
