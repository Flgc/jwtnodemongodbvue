/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: src/components/list-menu-admin.js
 * Description:
 * Data: 17/05/2021
 */

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ContactPhone from '@material-ui/icons/ContactPhone';
import PeopleIcon from '@material-ui/icons/People';
//import BarChartIcon from '@material-ui/icons/BarChart';
import WhatsApp from '@material-ui/icons/WhatsApp';
import ExitToApp from '@material-ui/icons/ExitToApp';
import apiConnecting from '../services/apiConnecting';
import { getToken, logout } from '../services/auth';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/admin/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuários" />
    </ListItem>
    <ListItem button component="a" href="/admin/whatsappclient">
      <ListItemIcon>
        <ContactPhone />
      </ListItemIcon>
      <ListItemText primary="Clientes" />
    </ListItem>
    {/* <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem> */}
    <ListItem button>
      <ListItemIcon>
        <WhatsApp />
      </ListItemIcon>
      <ListItemText primary="Mensagens Gravadas" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Opções</ListSubheader>
    <ListItem button onClick={exitConfirm}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);

async function exitConfirm() {
  if (window.confirm('Deseja realmente sair do sistema?')) {
    const response = await apiConnecting.get('/api/users/destroytoken', {
      headers: { token: getToken() },
    });
    if (response.status === 200) {
      logout();
      window.location.href = '/admin/login';
    } else {
      alert('Não foi possível fazer o logout!');
    }
  }
}
