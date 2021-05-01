/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: index.js
 * Description: Responsável por configurar o frontend
 * Data: 30/04/2021
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { registerServiceWorker } from './serviceWorker';

registerServiceWorker();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
