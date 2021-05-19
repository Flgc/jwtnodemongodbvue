/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/services/apiConnecting.js
 * Description: Responsável pelas comunicação do frontend com o  Backend
 * Data: 18/05/2021
 */

import axios from 'axios';

const apiConnecting = axios.create({
  baseURL: 'http://localhost:5000',
});

export default apiConnecting;
