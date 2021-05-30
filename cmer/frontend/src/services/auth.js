/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/services/auth.js
 * Description: Construtor do profile logado e autenticado
 * Data: 20/05/2021
 */

export const TOKEN_KEY = '&app-token';
export const ID_USER = '&id-user';
export const NAME_USER = '&name-user';
export const USER_TYPE = '&user-type';

//Save received token after correct login
export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.clear();
};

export const setIdUser = (id) => localStorage.setItem(ID_USER, id);
export const getIdUser = () => sessionStorage.getItem(ID_USER);

export const setNameUser = (nome) => localStorage.setItem(NAME_USER, nome);
export const getNameUser = localStorage.getItem('&name-user');

export const setTypeUser = (tipo) => localStorage.setItem(USER_TYPE, tipo);
export const getTypeUser = localStorage.getItem('&user-type');

export const getToken = () => localStorage.getItem(TOKEN_KEY);
