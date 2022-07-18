import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  createTheme,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { YouTube, GitHub, Search } from "@mui/icons-material";
import { Index, IndexSearchResult } from "flexsearch";
import { useEffect, useState } from "react";
import hymns from "./hymns.json";
import { Logo } from "./Icons";

const theme = createTheme({
  palette: { mode: "dark", primary: { main: "#edce5b", light: "#fff261", dark: "#a08b3d" } },
  typography: { fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif' },
});

const index = new Index({ preset: "performance", tokenize: "full" });

const App = () => {
  const [searching, setSearching] = useState(false);
  const [stroke, setStroke] = useState("");
  const [results, setResults] = useState<IndexSearchResult>([]);

  useEffect(() => {
    for (const [i, hymn] of hymns.entries()) {
      index.addAsync(i, `${hymn.num} ${hymn.title}`);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      index.searchAsync({ query: stroke, limit: 15 }).then((res) => {
        setResults(res);
        setSearching(false);
      });
    }, 250);

    return () => clearTimeout(timeout);
  }, [stroke]);

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
                </Grid>
                <Grid item>
                  <IconButton color="inherit" children={<GitHub />} href="https://github.com/mdmundo/fresh-hasd" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2, mb: 10 }}>
        <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
          {searching ? (
            <Grid item children={<CircularProgress />} />
          ) : results.length > 0 ? (
            results.map((id) => typeof id === "number" && <Hymn key={hymns[id].id} hymn={hymns[id]} />)
          ) : stroke ? (
            <Grid item children={<Typography variant="body1" children="A pesquisa não retornou qualquer hino" />} />
          ) : (
            hymns.map((hymn) => <Hymn key={hymn.id} hymn={hymn} />)
          )}
        </Grid>
      </Container>
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
