/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: src/pages/admin/dashboard/index.js
 * Description:
 * Data: 17/05/2021
 */

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin';
import { getTypeUser } from '../../../services/auth';
import Footer from '../../../components/footer-admin';
//import Paper from '@material-ui/core/Paper';

import DashAdmin from './admin';
import DashManager from './manager';
import DashEmployee from './employee';

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

// get background image of the logged user
function getDashBoard() {
  console.log(getTypeUser());
  if (getTypeUser() === '1') {
    return <DashAdmin />;
  } else if (getTypeUser() === '2') {
    return <DashManager />;
  } else {
    return <DashEmployee />;
  }
}

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/**/}
      {/* Desestructured Menu Layout */}
      <MenuAdmin title={'DASHBOARD'} />
      {/**/}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/**/}
            {/* Wallpaper */}
            {getDashBoard()}
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
