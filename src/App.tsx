import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  createTheme,
  Grid,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { YouTube } from "@mui/icons-material";
import hymns from "./hymns.json";

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
              <Grid container columnSpacing={1.25} direction="row" alignItems="center">
                <Grid item>
                  <Typography children="Logo" />
                </Grid>
                <Grid item>
                  <Typography children="Novo Hinário Adventista" />
                </Grid>
              </Grid>
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
      <Container sx={{ my: 2 }}>
        <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
          {hymns.map(({ id, num, title }) => (
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h6" children={num} />
                  <Typography variant="button" children={title} />
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" startIcon={<YouTube />} children="Tocar" />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
