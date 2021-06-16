/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: src/pages/admin/login/index.js
 * Description:
 * Data: 20/05/2021
 */

import { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import MenuHome from '../../../components/menu-home';
import Footer from '../../../components/footer-admin';

import ApiConnecting from '../../../services/apiConnecting';

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
    padding: theme.spacing(2),
    overflow: 'auto',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function NSessao() {
  const classes = useStyles();
  const [idSessao, setIdSessao] = useState('');
  const [loading, setLoading] = useState(false);

  // Start login validation
  async function handleSubmit() {
    if (idSessao === '') {
      alert('Informe o número da sessão!');
      window.location.href = '/';
    } else {
      await ApiConnecting.post('/api/whatsapp/sessionfront?id=' + idSessao, {
        sessao: idSessao,
      }).then((res) => {
        if (res.status === 200) {
          if (res.data.status === 1) {
            alert('Nova sessão inicializada com sucesso! ' + idSessao);
            window.location.href = '/';
          } else if (res.data.status === 2) {
            alert(res.data.error);
          }
          setLoading(false);
        } else {
          alert('Erro no servidor');
          setLoading(false);
        }
      });
    }
  }

  // login load time
  function loadSubmit() {
    setLoading(true);

    // Wait 0,5 seconds to view the load
    setTimeout(() => handleSubmit(), 500);
  }

  return (
    <div className={classes.root}>
      {/**/}
      {/* Desestructured Menu Layout */}
      <MenuHome
        title={
          'PROJETO APLICATO IGTI - Controle de Manutenção API com Node.js & MongoDb'
        }
      />
      {/**/}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/**/}
            {/*< INICIO DA TELA DE SESSAO >*/}
            {/**/}
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  Nova Sessão
                </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="sessao"
                  label="Informe o número da sessão?"
                  name="sessao"
                  autoComplete="Nova sessão"
                  autoFocus
                  // Enable variable in form
                  value={idSessao}
                  onChange={(e) => {
                    setIdSessao(e.target.value);
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  //start function
                  onClick={loadSubmit}
                  disabled={loading}
                >
                  {loading ? <CircularProgress /> : 'Iniciar'}
                </Button>
              </div>
            </Container>
            {/**/}
            {/*< FINAL DA TELA DE SESSAO >*/}
            {/**/}
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
