/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/routes.js
 * Description: Responsável pelas rotas do frontend
 * Data: 17/05/2021
 */

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Admin Imports
import Dashboard from './pages/admin/dashboard';
import Login from './pages/admin/login';

import WhatsAppClient from './pages/admin/whatsappClient';
import WhatsAppClientInsert from './pages/admin/whatsappClient/whatsappClient.insert';
import WhatsAppClientUpdate from './pages/admin/whatsappClient/whatsappClient.update';

import Users from './pages/admin/users';
import UsersInsert from './pages/admin/users/users.insert';
import UsersUpdate from './pages/admin/users/users.update';

// Client imports
import Home from './pages/client/home';
import WhatasppClientDetails from './pages/client/whatsappClient/whatsappClient.details';

// Authorization
import PrivateRoute from './services/wAuth';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Client Route*/}
        <Route path="/" exact component={Home} />
        <PrivateRoute
          path="/whatsappclient/:idClient"
          exact
          component={WhatasppClientDetails}
        />

        {/* Admin Route*/}
        <Route path="/admin/login" exact component={Login} />
        <PrivateRoute path="/admin" exact component={Dashboard} />

        <PrivateRoute
          path="/admin/whatsappclient"
          exact
          component={WhatsAppClient}
        />
        <PrivateRoute
          path="/admin/whatsappclient/include"
          exact
          component={WhatsAppClientInsert}
        />
        <PrivateRoute
          path="/admin/whatsappclient/update/:idClient"
          exact
          component={WhatsAppClientUpdate}
        />

        {/* Users Route*/}
        <PrivateRoute path="/admin/users" exact component={Users} />
        <PrivateRoute
          path="/admin/users/include"
          exact
          component={UsersInsert}
        />
        <PrivateRoute
          path="/admin/users/update/:userId"
          exact
          component={UsersUpdate}
        />
      </Switch>
    </BrowserRouter>
  );
}
