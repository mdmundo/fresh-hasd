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
import { Logo } from "./Icons";

const theme = createTheme({
  palette: { mode: "dark", primary: { main: "#edce5b", light: "#fff261", dark: "#a08b3d" } },
  typography: { fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif' },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppBar position="sticky">
      <Toolbar>
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 2 }}>
          <Grid item>
            <Grid container columnSpacing={1.25} direction="row" alignItems="center" justifyContent="flex-start">
              <Grid item>
                <Logo fontSize="large" />
              </Grid>
              <Grid item>
                <Typography variant="h6" children="Novo Hinário Adventista" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <Container sx={{ mt: 2, mb: 10 }}>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
        {hymns.map((hymn) => (
          <Hymn key={hymn.id} hymn={hymn} />
        ))}
      </Grid>
    </Container>
  </ThemeProvider>
);

const Hymn = ({ hymn }: { hymn: { id: string; num: string; title: string } }) => (
  <Grid item>
    <Card>
      <CardContent>
        <Typography variant="h6" children={`Hino ${hymn.num}`} />
        <Typography variant="button" children={hymn.title} />
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          startIcon={<YouTube />}
          children="Tocar"
          href={`https://youtu.be/${hymn.id}`}
        />
      </CardActions>
    </Card>
  </Grid>
);

export default App;
