/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: src/pages/admin/users/index.js
 * Description:
 * Data: 17/05/2021
 */

import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin';
//import ImgAdmin from '../../../assets/img/admin.png';
import Footer from '../../../components/footer-admin';
import Paper from '@material-ui/core/Paper';
import apiConnecting from '../../../services/apiConnecting';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';

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
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function UsersList() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  // Get existing users from the database
  useEffect(() => {
    async function loadUsers() {
      const res = await apiConnecting.get('/api/users.all');
      setUsers(res.data);
    }
    loadUsers();
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir este usuário?')) {
      var res = await apiConnecting.delete('/api/users/' + id);
      if (res.status === 201) {
        window.location.href = '/admin/users';
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente');
      }
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
              <Paper className={classes.paper}>
                <h2>Listagem de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="center">Tipo</TableCell>
                            <TableCell align="center">
                              Data de Cadastro
                            </TableCell>
                            <TableCell align="right">Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {users.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell component="th" scope="row">
                                {row.name_user}
                              </TableCell>
                              <TableCell align="left">
                                {row.email_user}
                              </TableCell>
                              <TableCell align="center">
                                {row.type_user === 1 ? (
                                  <Chip
                                    variant="outlined"
                                    size="small"
                                    label="Administrador"
                                    color="secondary"
                                  />
                                ) : (
                                  <Chip
                                    variant="outlined"
                                    size="small"
                                    label="Funcionário"
                                    color="primary "
                                  />
                                )}
                              </TableCell>
                              <TableCell align="right">
                                {new Date(row.createdAt).toLocaleString(
                                  'pt-br'
                                )}
                              </TableCell>
                              <TableCell align="right">
                                <ButtonGroup
                                  size="small"
                                  aria-label="small outlined button group"
                                >
                                  <Button
                                    color="primary"
                                    href={'/admin/users/update/' + row._id}
                                  >
                                    Atualizar
                                  </Button>
                                  <Button
                                    color="secondary"
                                    onClick={() => handleDelete(row._id)}
                                  >
                                    Excluir
                                  </Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
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
