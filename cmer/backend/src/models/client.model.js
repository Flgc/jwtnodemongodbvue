/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/models/user.model.js
 * Description: Responsável pelo modelo da da base 'Client'
 * Data: 15/05/2021
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    inAttendace: { type: Boolean, default: false },
    firstAttendace: { type: Boolean, default: true },
    WorkerAttendance: { type: String, default: 'no-one' },
    fullName: { type: String, required: true },
    profileUrl: { type: String },
    chatId: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'clients',
  }
);

const Clients = mongoose.model('Clients', clientSchema);
module.exports = Clients;
