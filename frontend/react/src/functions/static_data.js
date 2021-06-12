/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/functions/static_data.js
 * Description:Define o tipo e a cor do usuário logado
 * Data: 30/05/2021
 */

export const getNameType = (value) => {
  // // Solution 1
  // let name_type = '';
  // if (value === 1) {
  //   name_type = 'Administrador';
  // } else if (value === 2) {
  //   name_type = 'Gerente';
  // } else if (value === 3) {
  //   name_type = 'Funcionário';
  // }
  // return name_type;

  // // Solution 2
  // if (value === 1) {
  //   return 'Administrador';
  // } else if (value === 2) {
  //   return 'Gerente';
  // } else if (value === 3) {
  //   return 'Funcionário';
  // }
  // return '';

  // Solution 3
  var arr = ['Administrador', 'Gerente', 'Funcionário'];
  return arr[value - 1];
};

export const getNameTypeLabel = (value) => {
  // Solution 3
  var arr = ['secondary', 'primary', 'default'];
  return arr[value - 1];
};
