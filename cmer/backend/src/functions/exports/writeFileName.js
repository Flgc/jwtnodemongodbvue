/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/functions/exports/writeFileName.js
 * Description: Definição para gravação dos nomes dos arquivos
 * Data: 06/02/2021
 */

const mime = require('mime-types');

module.exports = {
  writeFileName(from, extension) {
    let date_ob = new Date();
    let date = ('0' + date_ob.getDate()).slice(-2);

    var telefone = String(`${from}`).split('@')[0].substr(2);
    let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let miliseconds = date_ob.getMilliseconds();

    const fileName =
      `${telefone}` +
      '-' +
      `${year}` +
      `${month}` +
      `${date}` +
      '-' +
      `${miliseconds}`;
    let file = `${fileName}.${extension}`;
    console.log(file);
    return file;
  },

  writeFileNameWithMime(from, mimetype) {
    let date_ob = new Date();
    let date = ('0' + date_ob.getDate()).slice(-2);

    var telefone = String(`${from}`).split('@')[0].substr(2);
    let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let miliseconds = date_ob.getMilliseconds();

    const fileName =
      `${telefone}` +
      '-' +
      `${year}` +
      `${month}` +
      `${date}` +
      '-' +
      `${miliseconds}`;
    let file = `${fileName}.${mime.extension(mimetype)}`;
    console.log(file);
    return file;
  },
};
