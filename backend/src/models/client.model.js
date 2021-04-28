/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/models/worker.model.js
 * Description: Responsável pelo modelo da classe 'Worker'
 * Data: 27/04/2021
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    fullName: { type: String, required: true },
    profileUrl: { type: String },
    chatId: { type: String, required: true },
    inAttendace: { type: Boolean, default: false },
    firstAttendace: { type: Boolean, default: true },
    WorkerAttendance: { type: String, default: "no-one" },
  },
  {
    timestamps: true,
    collection: "client",
  }
);

const ClientSchema = mongoose.model("ClientSchema", clientSchema);

module.exports = ClientSchema;
