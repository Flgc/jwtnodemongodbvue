/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/models/client.model.js
 * Description: clients Model
 * Data: 15/05/2021
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    fullName: { type: String, required: true },
    profileUrl: { type: String },
    chatId: { type: String, required: true },
    inAttendace: { type: Boolean, default: false },
    firstAttendace: { type: Boolean, default: true },
    WorkerAttendance: { type: String, default: 'no-one' },
  },
  {
    timestamps: true,
    collection: 'clients',
  }
);

const Clients = mongoose.model('Clients', clientSchema);
module.exports = Clients;
