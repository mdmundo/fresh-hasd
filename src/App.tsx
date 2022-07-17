import { AppBar, Container, createTheme, Grid, Paper, ThemeProvider, Toolbar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const theme = createTheme({
    palette: { mode: "dark", primary: { main: "#edce5b", light: "#fff261", dark: "#a08b3d" } },
    typography: { fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif' },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" enableColorOnDark>
        <Toolbar>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography children="Novo Hinário Adventista" />
            </Grid>
            <Grid item>
              <Grid container columnSpacing={2} direction="row" alignItems="center">
                <Grid item>
                  <Typography children="Github" />
                </Grid>
                <Grid item>
                  <Typography children="Barra de Pesquisa" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        {new Array(10).fill(0).map(() => (
          <Paper elevation={5} sx={{ p: 2, my: 3 }}>
            <Typography variant="h1" children="Novo Hinário Adventista" />
          </Paper>
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default App;
