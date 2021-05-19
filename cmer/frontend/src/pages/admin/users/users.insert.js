/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: src/pages/admin/users/users.insert.js
 * Description:
 * Data: 17/05/2021
 */

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin';
//import ImgAdmin from '../../../assets/img/admin.png';
import Footer from '../../../components/footer-admin';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 35,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: { width: '60%' },
}));

export default function UsersInsert() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/**/}
      {/* Desestructured Menu Layout */}
      <MenuAdmin title={'USUÁRIOS'} />
      {/**/}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Cadastro de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome Completo"
                      fullWidth
                      autoComplete="nome"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="labeltipo">Tipo</InputLabel>
                      <Select
                        labelId="labeltipo"
                        id="tipo"
                        // value={age}
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Funcionário</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="password"
                      required
                      id="senha"
                      name="senha"
                      label="senha"
                      fullWidth
                      autoComplete="senha"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="foto"
                      name="foto"
                      label="foto"
                      fullWidth
                      autoComplete="foto"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          <Box pt={4}>
            {/**/}
            {/* Desestructured Footer Layout */}
            <Footer />
            {/**/}
          </Box>
        </Container>
      </main>
    </div>
  );
}
