/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: src/pages/admin/whatsappMessage/index.js
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

export default function WhatsAppMessageList() {
  const classes = useStyles();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get existing messages from the database
  useEffect(() => {
    async function loadMessages() {
      const res = await apiConnecting.get('/api/messages/allmessage');
      setMessages(res.data);
      setLoading(false);
    }
    //loadMessages();

    // Wait 0,5 seconds to view the load
    setTimeout(() => loadMessages(), 500);
  }, []);

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir esta mensagem?')) {
      var res = await apiConnecting.delete('/api/messages/delete/' + id);
      if (res.status === 201) {
        window.location.href = '/admin/whatsappMessage';
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente');
      }
    }
  }

  return (
    <div className={classes.root}>
      {/**/}
      {/* Desestructured Menu Layout */}
      <MenuAdmin title={'MENSAGENS GRAVADAS'} />
      {/**/}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Listagem de Mensagens Gravadas</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      {/* 
                        Progress bar for messages loading 
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
                                <b>Tipo</b>
                              </TableCell>
                              <TableCell align="left">
                                <b>ChatId</b>
                              </TableCell>
                              <TableCell align="left">
                                <b>Contato</b>
                              </TableCell>
                              <TableCell align="left">
                                <b>Data do Cadastro</b>
                              </TableCell>
                              <TableCell align="right">
                                <b>Opções</b>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {messages.map((row) => (
                              <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                  {row.type}
                                  <tr>
                                    <b>Body: </b>
                                    {row.body}
                                  </tr>
                                  <tr>
                                    <b>FileLink: </b>
                                    {row.fileLink}
                                  </tr>
                                  <tr>
                                    <b>FileLinkDownload: </b>
                                    {row.fileLinkDownload}
                                  </tr>
                                </TableCell>
                                <TableCell align="left">
                                  {row.chatId}
                                  <tr>
                                    <b>Message: </b>
                                    {row.message}
                                  </tr>
                                </TableCell>
                                <TableCell align="left">
                                  {row.author}
                                  <tr>
                                    <b>FileName: </b> {row.fileName}
                                  </tr>
                                </TableCell>
                                {/* <TableCell align="center"></TableCell> */}
                                <TableCell align="left">
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
