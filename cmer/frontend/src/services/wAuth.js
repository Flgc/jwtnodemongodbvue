/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/services/wAuth.js
 * Description: Autorização das Rotas do ReactJS
 * Data: 30/05/2021
 */

import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import apiConnecting from './apiConnecting';
import { login, logout, getToken } from './auth';

export default function WAuth({ component: Component, ...rest }) {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      var res = await apiConnecting.get('/api/users/checktoken', {
        params: { token: getToken() },
      });
      if (res.data.status === 200) {
        setLoading(false);
        setRedirect(false);
      } else {
        // Return to the login page
        logout();
        setLoading(false);
        setRedirect(true);
      }
    }
    verify();
  }, []);

  return loading ? (
    'Carregando...'
  ) : (
    <Route
      {...rest}
      render={(props) =>
        !redirect ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/admin/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}
