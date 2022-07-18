import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  createTheme,
  Grid,
  IconButton,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { GitHub, YouTube } from "@mui/icons-material";
import hymns from "./hymns.json";
import { Logo } from "./Icons";

const theme = createTheme({
  palette: { mode: "dark", primary: { main: "#edce5b", light: "#fff261", dark: "#a08b3d" } },
  typography: { fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif' },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
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
      <Paper elevation={4} square sx={{ py: 1.5, mt: "auto" }}>
        <Grid container direction="row" justifyContent="center" alignItems="center" columnSpacing={1}>
          <Grid item children={<Typography align="center" variant="caption" children="por Edmundo Paulino" />} />
          <Grid
            item
            children={
              <IconButton
                size="small"
                color="inherit"
                children={<GitHub />}
                href="https://github.com/mdmundo/fresh-hasd"
              />
            }
          />
          <Grid item children={<Typography align="center" variant="caption" children="criado em 2022" />} />
        </Grid>
      </Paper>
    </Box>
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
