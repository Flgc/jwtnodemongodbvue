/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: src/pages/admin/whatsappClient/index.js
 * Description:
 * Data: 09/06/2021
 */

import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin';
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
import LinearProgress from '@material-ui/core/LinearProgress';
// import AddIcon from '@material-ui/icons/Add';
// import AutorenewIcon from '@material-ui/icons/Autorenew';
import ClearIcon from '@material-ui/icons/Clear';

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
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function WhatsAppClientList() {
  const classes = useStyles();

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get existing clients from the database
  useEffect(() => {
    async function loadclients() {
      const res = await apiConnecting.get('/api/clients/allclient');
      setClients(res.data);
      setLoading(false);
    }
    //loadclients();

    // Wait 0,5 seconds to view the load
    setTimeout(() => loadclients(), 500);
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir este cliente?')) {
      var res = await apiConnecting.delete('/api/clients/delete/' + id);
      if (res.status === 201) {
        window.location.href = '/admin/whatsappclient';
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente');
      }
    }
  }

  return (
    <div className={classes.root}>
      {/**/}
      {/* Desestructured Menu Layout */}
      <MenuAdmin title={'CLIENTES'} />
      {/**/}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              {/* <Button
                style={{ marginBottom: '10px' }}
                variant="contained"
                color="primary"
                href={'/admin/whatsappclient/include'}
              >
                <AddIcon />
                Cadastrar
              </Button> */}
              <Paper className={classes.paper}>
                <h2>Listagem de Clientes</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      {/* 
                        Progress bar for clients loading 
                      */}
                      {loading ? (
                        <LinearProgress
                          style={{ width: '50%', margin: '20px auto' }}
                        />
                      ) : (
                        <Table
                          className={classes.table}
                          size="small"
                          aria-label="a dense table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <b>Nome</b>
                              </TableCell>
                              <TableCell align="left">
                                <b>Contato (ChatID)</b>
                              </TableCell>
                              <TableCell align="center">
                                {/* Espaço em branco para manter a formatação da coluna - todo */}
                              </TableCell>
                              <TableCell align="center">
                                <b>Data de Cadastro</b>
                              </TableCell>
                              <TableCell align="right">
                                <b>Opções</b>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {clients.map((row) => (
                              <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                  {row.fullName}
                                  <tr> - </tr>
                                  <tr>
                                    <b>ProfileUrl: </b> {row.profileUrl}
                                  </tr>
                                </TableCell>
                                <TableCell align="left">{row.chatId}</TableCell>
                                <TableCell align="center">
                                  {/* Espaço em branco para manter a formatação da coluna - todo */}
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
                                    {/* <Button
                                      color="primary"
                                      href={'/admin/clients/update/' + row._id}
                                    >
                                      <AutorenewIcon />
                                      Atualizar
                                    </Button> */}
                                    <Button
                                      color="secondary"
                                      onClick={() => handleDelete(row._id)}
                                    >
                                      <ClearIcon />
                                      Excluir
                                    </Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
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
