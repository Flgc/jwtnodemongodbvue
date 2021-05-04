/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: wAuth.js
 * Description: Responsável por autorizar o login no frontend
 * Data: 30/04/2021* Data: 30/04/2021
 */

import React, { useEffect, useState } from 'react';
import api from './api';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { logout, getToken } from './auth';

import { Route, Redirect } from 'react-router-dom';

export default function WAuth({ component: Component, ...rest }) {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(async () => {
  //   let res = await api.get('/api/login/checktoken/' + getToken());
  //   if (res.data.status == 200) {
  //     setLoading(false);
  //     setRedirect(false);
  //   } else {
  //     logout();
  //     setLoading(false);
  //     setRedirect(true);
  //   }
  // }, []);

  useEffect(() => {
    async function setForce() {
      let res = await api.get('/api/login/checktoken/' + getToken());
      if (res.data.status === 200) {
        setLoading(false);
        setRedirect(false);
      } else {
        logout();
        setLoading(false);
        setRedirect(true);
      }
    }
    setForce();
  }, []);

  return loading ? (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Route
      {...rest}
      render={(props) =>
        !redirect ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/admin/login', state: { from: props.location } }}
          ></Redirect>
        )
      }
    ></Route>
  );
}
