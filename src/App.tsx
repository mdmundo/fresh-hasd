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
  const [stroke, setStroke] = useState("");
  const [results, setResults] = useState<IndexSearchResult>([]);
  useEffect(() => {
    for (const [i, hymn] of hymns.entries()) {
      index.addAsync(i, `${hymn.num} ${hymn.title}`);
    }
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      index.searchAsync(stroke).then((res) => {
        setResults(res);
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
                    onChange={(e) => {
                      setStroke(e.target.value);
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
          {results.map(
            (id) =>
              typeof id === "number" && (
                <Grid item key={hymns[id].id}>
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
                        href={`https://youtu.be/${hymns[id].id}`}
                      />
                    </CardActions>
                  </Card>
                </Grid>
              )
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
