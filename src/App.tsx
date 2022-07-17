import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  createTheme,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { YouTube, GitHub, Search } from "@mui/icons-material";
import hymns from "./hymns.json";
import { Logo } from "./Icons";

const App = () => {
  const theme = createTheme({
    palette: { mode: "dark", primary: { main: "#edce5b", light: "#fff261", dark: "#a08b3d" } },
    typography: { fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif' },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 2 }}>
            <Grid item xs={12} sm={6}>
              <Grid container columnSpacing={1.25} direction="row" alignItems="center" justifyContent="flex-start">
                <Grid item>
                  <Logo fontSize="large" />
                </Grid>
                <Grid item>
                  <Typography variant="h6" children="Novo Hinário Adventista" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container direction="row" alignItems="center" justifyContent="flex-end">
                <Grid item>
                  <InputBase
                    placeholder="Pesquisar..."
                    autoFocus
                    startAdornment={
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item>
                  <IconButton color="inherit" children={<GitHub />} />
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
