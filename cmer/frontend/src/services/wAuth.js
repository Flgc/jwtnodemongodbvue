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
import { logout, getToken } from './auth';
import LinearProgress from '@material-ui/core/LinearProgress';

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
    //verify();

    // Wait 0,5 seconds to view the load
    setTimeout(() => verify(), 500);
  }, []);

  return loading ? (
    <LinearProgress style={{ width: '50%', margin: '80px auto' }} />
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
