/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: src/pages/admin/users/users.insert.js
 * Description:
 * Data: 17/05/2021
 */

import { useState } from 'react';
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
import Button from '@material-ui/core/Button';
import apiConnecting from '../../../services/apiConnecting';

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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 35,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: { width: '60%' },
  btnSuccess: {
    backgroundColor: 'green',
    color: '#fff',
    '&:hover': { backgroundColor: '#12b912' },
  },
}));

export default function UsersInsert() {
  const classes = useStyles();

  const [nome_form, setNome] = useState('');
  const [email_form, setEmail] = useState('');
  const [tipo_form, setTipo] = useState('');
  const [senha_form, setSenha] = useState('');
  const [foto_form, setFoto] = useState('');

  async function handleSubmit() {
    /* Receive all form variables */
    const data = {
      name_user: nome_form,
      email_user: email_form,
      type_user: tipo_form,
      password_user: senha_form,
      photo_profile_user: foto_form,
    };

    if (
      nome_form !== '' &&
      email_form !== '' &&
      tipo_form !== '' &&
      senha_form !== ''
    ) {
      const res = await apiConnecting.post('/api/users', data);

      if (res.status === 201) {
        window.location.href = '/admin/users';
      } else {
        alert('Erro ao cadastrar o usuário!s');
      }
    } else {
      alert('Por favor, preencha todos os dados obrigatório!');
    }
  }

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
              <Button
                style={{ marginBottom: 10 }}
                variant="contained"
                href={'/admin/users'}
              >
                Voltar
              </Button>
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
                      value={nome_form}
                      onChange={(e) => setNome(e.target.value)}
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
                      value={email_form}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="labeltipo">Tipo</InputLabel>
                      <Select
                        labelId="labeltipo"
                        id="tipo"
                        value={tipo_form}
                        onChange={(e) => setTipo(e.target.value)}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Gerente</MenuItem>
                        <MenuItem value={3}>Funcionário</MenuItem>
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
                      value={senha_form}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      //required
                      id="foto"
                      name="foto"
                      label="foto"
                      fullWidth
                      autoComplete="foto"
                      value={foto_form}
                      onChange={(e) => setFoto(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      className={classes.btnSuccess}
                    >
                      Salvar
                    </Button>
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
