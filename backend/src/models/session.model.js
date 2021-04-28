/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/models/session.model.js
 * Description: Responsável pelo modelo da classe 'Session'
 * Data: 26/04/2021
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ==> Define a Collection (Tabela = 'messages')
const sessionSchema = new Schema(
  {
    phone: { type: String, maxlength: 30, required: false },
    name: { type: String, maxlength: 50, required: false },
    type: { type: String },
    message: { type: String },
    body: { type: String },
    author: { type: String },
    isServer: { type: Boolean, default: false },
    chatId: { type: String, required: true },
    fileLink: { type: String, ref: "files" },
    fileLinkDownload: { type: String, ref: "files" },
    fileName: { String },
  },
  {
    timestamps: true,
    collection: "session",
  }
);

// ==> Faz uma pesquisa atravez de messages por phone
sessionSchema.statics.findByMessagePhoneName = async (phone) => {
  const session = await Session.findOne({ phone });

  if (!session) {
    throw new Error({ error: "Telefône inválido!" });
  }
  return session;
};

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
