/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: api.js
 * Description: Chamada da API
 * Data: 30/04/2021
 */

import axios from 'axios';

let port = window.location.port;

if (window.location.protocol === 'https:' && port === '') {
  port = '443';
}

if (window.location.protocol === 'http:' && port === '') {
  port = '80';
}

let proxy = `${window.location.protocol}//${window.location.hostname}:${port}`;

const api = axios.create({
  baseURL: proxy,
});

export default api;
