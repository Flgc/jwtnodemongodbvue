/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: getTipo.js
 * Description: Define os tipos no frontend
 * Data: 30/04/2021* Data: 30/04/2021
 */

function getTipo(value) {
  switch (value) {
    case 1:
      return 'Funcionário';
    case 2:
      return 'Gerente';
    case 3:
      return 'Administrador';
    default:
  }
}

export default getTipo;
