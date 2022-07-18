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
import InfiniteScroll from "react-infinite-scroll-component";
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
        tokenize: "strict",
      },
      {
        field: "title",
        tokenize: "full",
      },
    ],
  },
});

const scrollDefault = hymns.slice(0, 20);

const App = () => {
  const [searching, setSearching] = useState(false);
  const [stroke, setStroke] = useState("");
  const [results, setResults] = useState<Array<Id>>([]);
  const [scroll, setScroll] = useState(scrollDefault);

  useEffect(() => {
    for (const [i, hymn] of hymns.entries()) {
      index.addAsync(i, hymn);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      index.searchAsync({ query: stroke, limit: 15 }).then((res) => {
        setResults(res[0]?.result || []);
        setSearching(false);
      });
    }, 250);

    return () => clearTimeout(timeout);
  }, [stroke]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Fade in timeout={1750}>
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
            <Stack spacing={3}>
              <Paper>
                <InputBase
                  sx={{ p: 1.3 }}
                  placeholder="Pesquisar..."
                  autoFocus
                  fullWidth
                  onChange={({ target: { value } }) => {
                    setStroke(value);
                    if (value) setSearching(true);
                    setScroll(scrollDefault);
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  }
                />
              </Paper>
              <Container disableGutters>
                <InfiniteScroll
                  dataLength={scroll.length}
                  next={() => {
                    setScroll(hymns.slice(0, scroll.length + 30));
                  }}
                  hasMore={scroll.length < 601}
                  loader={undefined}
                >
                  <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
                    {searching ? (
                      <Grid item children={<CircularProgress />} />
                    ) : results.length > 0 ? (
                      results.map((id) => typeof id === "number" && <Hymn key={hymns[id].id} hymn={hymns[id]} />)
                    ) : stroke ? (
                      <Grid
                        item
                        children={<Typography variant="body1" children="A pesquisa não retornou qualquer hino" />}
                      />
                    ) : (
                      scroll.map((hymn) => <Hymn key={hymn.id} hymn={hymn} />)
                    )}
                  </Grid>
                </InfiniteScroll>
              </Container>
            </Stack>
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
      </Fade>
    </ThemeProvider>
  );
};

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
