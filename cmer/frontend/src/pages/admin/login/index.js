/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: src/pages/admin/login/index.js
 * Description:
 * Data: 20/05/2021
 */

import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
//import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../../../services/apiConnecting';
import {
  login,
  setIdUser,
  setNameUser,
  //  setTypeUser,
} from '../../../services/auth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        MecanicaBot
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
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

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSubmit() {
    await api
      .post('/api/users/login', {
        email: email,
        senha: senha,
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.status === 1) {
            // Received information of localStorage
            login(res.data.token);
            setIdUser(res.data.id_client);
            setNameUser(res.data.user_name);
            //
            window.location.href = '/admin';
            //
          } else if (res.data.status === 2) {
            alert('Atenção! => ' + res.data.error);
          }
        } else {
          alert('Erro no servidor');
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Digite seu email"
          name="email"
          autoComplete="email"
          autoFocus
          // Enable variable in form
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Digite sua senha"
          type="password"
          id="password"
          autoComplete="current-password"
          value={senha}
          //Enable variable in form
          onChange={(e) => {
            setSenha(e.target.value);
          }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          //start function
          onClick={handleSubmit}
        >
          Entrar
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
