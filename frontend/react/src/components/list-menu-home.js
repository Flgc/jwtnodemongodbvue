/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: src/components/list-menu-home.js
 * Description:
 * Data: 12/06/2021
 */

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PeopleIcon from '@material-ui/icons/People';
import WhatsApp from '@material-ui/icons/WhatsApp';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/admin/login">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Login" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Whatsapp</ListSubheader>
    {/* <ListItem button component="a" href="/admin/whatsappMessage"> */}
    <ListItem button component="a" href="/">
      <ListItemIcon>
        <WhatsApp />
      </ListItemIcon>
      <ListItemText primary="Nova Sessão" />
    </ListItem>
  </div>
);
