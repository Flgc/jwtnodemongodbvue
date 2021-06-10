/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: src/pages/admin/whatsappClient/whatsappClient.update.js
 * Description:
 * Data: 10/06/2021
 */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import apiConnecting from '../../../services/apiConnecting';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';

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

export default function WhatsAppClientUpdate() {
  const classes = useStyles();

  const [nome_form, setNome] = useState('');
  const [worker_form, setWorker] = useState('');
  const [inAttendace_form, setinAttendace] = useState('');
  const [firstAttendace_form, setfirstAttendace] = useState('');
  const [chatId_form, setchatId] = useState('');
  const [profileUrl_form, setprofileUrl] = useState('');

  const { clientId } = useParams();

  // Returns data from database users to the local variable
  useEffect(() => {
    async function getClients() {
      var res = await apiConnecting.get('/api/clients/details/' + clientId);
      console.log(res);

      setNome(res.data.fullName);
      setWorker(res.data.workerAttendance);
      setinAttendace(res.data.inAttendace);
      setfirstAttendace(res.data.firstAttendace);
      setchatId(res.data.chatId);
      setprofileUrl(res.data.profileUrl);
    }

    getClients();
  }, [clientId]);
  async function handleSubmit() {
    /* Receive all form variables */
    const data = {
      fullName: nome_form,
      workerAttendance: worker_form,
      inAttendace: inAttendace_form,
      firstAttendace: firstAttendace_form,
      chatId: chatId_form,
      profileUrl: profileUrl_form,
    };

    if (
      nome_form !== '' &&
      worker_form !== '' &&
      inAttendace_form !== '' &&
      firstAttendace_form !== '' &&
      chatId_form !== '' &&
      profileUrl_form !== ''
    ) {
      const res = await apiConnecting.put(
        '/api/clients/update/' + clientId,
        data
      );

      if (res.status === 201) {
        window.location.href = '/admin/whatsappclient';
      } else {
        alert('Erro ao atualizar o cliente!');
      }
    } else {
      alert('Por favor, preencha todos os dados obrigatório!');
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
              <Button
                style={{ marginBottom: 10, marginRight: 5 }}
                variant="contained"
                href={'/admin/whatsappclient'}
              >
                <ArrowBackIcon />
                Voltar
              </Button>
              <Button
                style={{ marginBottom: 10 }}
                variant="contained"
                color="primary"
                href={'/admin/whatsappclient/include'}
              >
                <AddIcon />
                Cadastrar
              </Button>
              <Paper className={classes.paper}>
                <h2>Atualização de Clientes</h2>
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
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="atendente"
                      name="atendente"
                      label="Atendente"
                      fullWidth
                      autoComplete="atendente"
                      value={worker_form}
                      onChange={(e) => setWorker(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="labelinAttendace">Atendido</InputLabel>
                      <Select
                        labelId="labelinAttendace"
                        id="inAttendace"
                        value={inAttendace_form}
                        onChange={(e) => setinAttendace(e.target.value)}
                      >
                        <MenuItem value={true}>Sim</MenuItem>
                        <MenuItem value={false}>Não</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="labelfirstAttendace">
                        1º Atendimento
                      </InputLabel>
                      <Select
                        labelId="labelfirstAttendace"
                        id="firstAttendace"
                        value={firstAttendace_form}
                        onChange={(e) => setfirstAttendace(e.target.value)}
                      >
                        <MenuItem value={true}>Sim</MenuItem>
                        <MenuItem value={false}>Não</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="chatId"
                      name="chatId"
                      label="chatId"
                      fullWidth
                      autoComplete="chatId"
                      value={chatId_form}
                      onChange={(e) => setchatId(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      //required
                      id="profileUrl"
                      name="profileUrl"
                      label="profileUrl"
                      fullWidth
                      autoComplete="profileUrl"
                      value={profileUrl_form}
                      onChange={(e) => setprofileUrl(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      className={classes.btnSuccess}
                    >
                      <SaveIcon />
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
