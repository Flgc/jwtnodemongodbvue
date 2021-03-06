/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/models/messages.model.js
 * Description: messages Model
 * Data: 15/05/2021
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema(
  {
    type: { type: String },
    message: { type: String },
    body: { type: String },
    author: { type: String },
    isServer: { type: Boolean, default: false },
    chatId: { type: String, required: true },
    fileLink: { type: String, ref: 'files' },
    fileLinkDownload: { type: String, ref: 'files' },
    fileName: String,
  },
  {
    timestamps: true,
    collection: 'messages',
  }
);

const Messages = mongoose.model('Messages', messagesSchema);
module.exports = Messages;
