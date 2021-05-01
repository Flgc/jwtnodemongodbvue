/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: getColor.js
 * Description: Responsável pelas cores no frontend
 * Data: 30/04/2021* Data: 30/04/2021
 */

function getColor(value) {
  switch (value) {
    case 1:
      return 'default';
    case 2:
      return 'primary';
    case 3:
      return 'secondary';
    default:
  }
}

export default getColor;
