import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  createTheme,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { GitHub, Search, YouTube } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Document, Id } from "flexsearch";
import hymns from "./hymns.json";
import { Logo } from "./Icons";

const theme = createTheme({
  palette: { mode: "dark", primary: { main: "#edce5b", light: "#fff261", dark: "#a08b3d" } },
  typography: { fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif' },
});

const index = new Document({
  document: {
    id: "id",
    index: [
      {
        field: "num",
        preset: "performance",
      },
      {
        field: "title",
        tokenize: "full",
      },
      {
        field: "lyrics",
        preset: "match",
        tokenize: "forward",
      },
    ],
  },
});

const App = () => {
  const [searching, setSearching] = useState(false);
  const [stroke, setStroke] = useState("");
  const [results, setResults] = useState<Array<Id>>([]);

  useEffect(() => {
    for (const [i, hymn] of hymns.entries()) {
      index.addAsync(i, hymn);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      index.searchAsync({ query: stroke, limit: 15 }).then((res) => {
        setResults([...new Set(res.flatMap((field) => field.result).slice(0, 10))] || []);
        setSearching(false);
      });
    }, 250);

    return () => clearTimeout(timeout);
  }, [stroke]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Fade in timeout={1250} easing="cubic-bezier(0.675, -0.340, 1.000, 0.265)">
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <AppBar position="static">
            <Toolbar>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ py: 2 }}
              >
                <Grid item>
                  <Grid
                    container
                    columnSpacing={1.25}
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
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
          <Container sx={{ mt: 2, mb: 5 }}>
            <Stack spacing={3}>
              <Paper>
                <InputBase
                  sx={{ p: 1.3 }}
                  placeholder="Pesquisar…"
                  autoFocus
                  fullWidth
                  onChange={({ target: { value } }) => {
                    setStroke(value);
                    if (value) setSearching(true);
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  }
                />
              </Paper>
              <Container disableGutters>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={2}
                >
                  {searching ? (
                    <Grid item children={<CircularProgress />} />
                  ) : results.length > 0 ? (
                    results.map(
                      (id) =>
                        typeof id === "number" && (
                          <Grid key={hymns[id].id} item>
                            <Card>
                              <CardContent>
                                <Typography variant="h6" children={`Hino ${hymns[id].num}`} />
                                <Typography variant="button" children={hymns[id].title} />
                              </CardContent>
                              <CardActions>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  startIcon={<YouTube />}
                                  children="Tocar"
                                  href={`https://youtu.be/${hymns[id].yt}`}
                                />
                              </CardActions>
                            </Card>
                          </Grid>
                        )
                    )
                  ) : stroke ? (
                    <Grid
                      item
                      children={
                        <Typography
                          variant="body1"
                          children="A pesquisa não retornou qualquer hino"
                        />
                      }
                    />
                  ) : (
                    <Grid item>
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                        sx={{ color: "text.disabled" }}
                      >
                        <Typography
                          variant="body2"
                          color="inherit"
                          align="center"
                          children="Pesquise por número, título ou trecho da letra."
                        />
                        <Logo color="inherit" sx={{ fontSize: "12rem" }} />
                      </Stack>
                    </Grid>
                  )}
                </Grid>
              </Container>
            </Stack>
          </Container>
          <Paper elevation={4} square sx={{ py: 1.5, mt: "auto" }}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              columnSpacing={1}
            >
              <Grid
                item
                children={
                  <Typography align="center" variant="caption" children="por Edmundo Paulino" />
                }
              />
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
              <Grid
                item
                children={<Typography align="center" variant="caption" children="criado em 2022" />}
              />
            </Grid>
          </Paper>
        </Box>
      </Fade>
    </ThemeProvider>
  );
};

export default App;
