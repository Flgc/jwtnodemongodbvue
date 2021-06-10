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
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';

import ApiConnecting from '../../../services/apiConnecting';
import {
  login,
  setIdUser,
  setNameUser,
  setTypeUser,
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
  const [password, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Start login validation
  async function handleSubmit() {
    await ApiConnecting.post('/api/login', {
      email: email,
      password: password,
    }).then((res) => {
      if (res.status === 200) {
        if (res.data.status === 1) {
          // Received information of localStorage
          login(res.data.token);
          setIdUser(res.data.user_id);
          setNameUser(res.data.user_name);
          setTypeUser(res.data.user_type);
          window.location.href = '/admin';
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

  // login load time
  function loadSubmit() {
    setLoading(true);

    // Wait 0,5 seconds to view the load
    setTimeout(() => handleSubmit(), 500);
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
        {/* <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Digite sua senha"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          //Enable variable in form
          onChange={(e) => {
            setSenha(e.target.value);
          }}
        /> */}

        <FormControl
          variant="outlined"
          style={{ width: '100%', marginTop: 10 }}
        >
          <InputLabel htmlFor="passwordField">Digite sua senha *</InputLabel>
          <OutlinedInput
            id="passwordField"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setSenha(e.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={(e) => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={133}
          />
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          //start function
          onClick={loadSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress /> : 'Entrar'}
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
