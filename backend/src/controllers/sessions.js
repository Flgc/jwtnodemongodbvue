/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/controllers/sessions.js
 * Description: Implementa a API venom-bot na aplicação
 * Data: 28/03/2021
 */

// person.js
"use strict";

// const os = require("os");
// const fs = require("fs");
// const mime = require("mime-types");
// const path = require("path");
const venom = require("venom-bot");
// const dialogflow = require("@google-cloud/dialogflow").v2beta1;
// const uuid = require("uuid");
// const { json } = require("express");
// const { Session } = require("inspector");
// const puppeteer = require("puppeteer");

// const grpVendas = process.env.GRP_VENDAS;
// const grpAssistencia = process.env.GRP_ASSISTENCIA;

module.exports = class Sessions {
  static async start(sessionName) {
    Sessions.sessions = Sessions.sessions || []; //start array

    var session = Sessions.getSession(sessionName);

    if (session == false) {
      //create new session
      console.log("session == false");
      session = await Sessions.addSesssion(sessionName);
    } else if (["CLOSED"].includes(session.state)) {
      //restart session
      console.log("session.state == CLOSED");
      session.state = "STARTING";
      session.status = "notLogged";
      session.client = Sessions.initSession(sessionName);
      Sessions.setup(sessionName);
    } else if (
      ["CONFLICT", "UNPAIRED", "UNLAUNCHED"].includes(session.state) ||
      ["isLogged"].includes(session.status)
    ) {
      console.log(
        "Estado da Sessão: " + session.state + ". Status: " + session.status
      );
      session.client.then((client) => {
        client.useHere();
        console.log("Chamado função useHere()");
      });
    } else {
      console.log("session.state: " + session.state);
    }
    return session;
  } //start

  static async addSesssion(sessionName) {
    var newSession = {
      name: sessionName,
      qrcode: false,
      client: false,
      status: "notLogged",
      state: "STARTING",
    };
    Sessions.sessions.push(newSession);
    console.log("newSession.state: " + newSession.state);

    //setup session
    newSession.client = Sessions.initSession(sessionName);
    Sessions.setup(sessionName);

    return newSession;
  } //addSession

  static async initSession(sessionName) {
    var session = Sessions.getSession(sessionName);
    const client = await venom.create(
      sessionName,
      (base64Qr) => {
        session.state = "QRCODE";
        session.qrcode = base64Qr;
        console.log("new qrcode updated - session.state: " + session.state);
      },
      (statusFind) => {
        session.status = statusFind;
        console.log("session.status: " + session.status);
      },
      {
        folderNameToken: "tokens",
        mkdirFolderToken: "",
        headless: true,
        devtools: false,
        useChrome: false,
        debug: false,
        logQR: false,
        browserArgs: [
          "--log-level=3",
          "--no-default-browser-check",
          "--disable-site-isolation-trials",
          "--no-experiments",
          "--ignore-gpu-blacklist",
          "--ignore-certificate-errors",
          "--ignore-certificate-errors-spki-list",
          "--disable-gpu",
          "--disable-extensions",
          "--disable-default-apps",
          "--enable-features=NetworkService",
          "--disable-setuid-sandbox",
          "--no-sandbox",
          // Extras
          "--disable-webgl",
          "--disable-threaded-animation",
          "--disable-threaded-scrolling",
          "--disable-in-process-stack-traces",
          "--disable-histogram-customizer",
          "--disable-gl-extensions",
          "--disable-composited-antialiasing",
          "--disable-canvas-aa",
          "--disable-3d-apis",
          "--disable-accelerated-2d-canvas",
          "--disable-accelerated-jpeg-decoding",
          "--disable-accelerated-mjpeg-decode",
          "--disable-app-list-dismiss-on-blur",
          "--disable-accelerated-video-decode",
        ],
        refreshQR: 15000,
        autoClose: 60 * 60 * 24 * 365, //never
        disableSpins: true,
      }
    );
    return client;
  } //initSession

  static async setConnection(sessionName) {
    var session = Sessions.getSession(sessionName);

    if (session) {
      if (session.state == "QRCODE" || session.state == "STARTING") {
        session.state = "CONNECTED";
        return { result: "Alterado para CONNECTED" };
      } else {
        return { result: "error", message: session.state };
      }
    } else {
      return { result: "error", message: "NOTFOUND" };
    }
  } //Após ler o QRCode, forçar a mudança do estado para conectado.

  //Auto resposta
  static async setup(sessionName) {
    var session = Sessions.getSession(sessionName);
    await session.client.then((client) => {
      client.onStateChange((state) => {
        session.state = state;
        console.log("session.state: " + state);
      }); //.then((client) => Sessions.startProcess(client));

      client.onMessage(async (message) => {
        //todas as mensagens chegam aqui... voce pode tomar decisões de respostas aqui.
        console.log(message); // objeto recebido quando chega msg
        client.sendText(messages.from, "Recebido via bot"); // exemplo de resposta.
      });

      //Em caso de chamdas de voz...
      client.onIncomingCall(async (call) => {
        console.log("CALL:", call);
        client.sendText(
          call.peerJid,
          "Desculpa! Sou um atendente virtual.\nAinda não consigo atender chamadas."
        );
        //Comunica a alguém que houve uma chamada perdida.
        client.sendText("558499495226@c.us", "Nova chamada perdida.");
      });
    });
  } //setup

  static async closeSession(sessionName) {
    var session = Sessions.getSession(sessionName);
    if (session) {
      //só adiciona se não existir
      if (session.state != "CLOSED") {
        if (session.client)
          await session.client.then(async (client) => {
            try {
              await client.close();
            } catch (error) {
              console.log("client.close(): " + error.message);
            }
            session.state = "CLOSED";
            session.client = false;
            console.log("client.close - session.state: " + session.state);
          });
        return { result: "success", message: "CLOSED" };
      } else {
        //close
        return { result: "success", message: session.state };
      }
    } else {
      return { result: "error", message: "NOTFOUND" };
    }
  } //close

  static getSession(sessionName) {
    var foundSession = false;
    if (Sessions.sessions)
      Sessions.sessions.forEach((session) => {
        if (sessionName == session.name) {
          foundSession = session;
        }
      });
    return foundSession;
  } //getSession

  static getSessions() {
    if (Sessions.sessions) {
      return Sessions.sessions;
    } else {
      return [];
    }
  } //getSessions

  static async getQrcode(sessionName) {
    var session = Sessions.getSession(sessionName);
    if (session) {
      //if (["UNPAIRED", "UNPAIRED_IDLE"].includes(session.state)) {
      if (["UNPAIRED_IDLE"].includes(session.state)) {
        //restart session
        await Sessions.closeSession(sessionName);
        Sessions.start(sessionName);
        return { result: "error", message: session.state };
      } else if (["CLOSED"].includes(session.state)) {
        Sessions.start(sessionName);
        return { result: "error", message: session.state };
      } else {
        //CONNECTED
        if (session.status != "isLogged") {
          return {
            result: "success",
            message: session.state,
            qrcode: session.qrcode,
          };
        } else {
          return { result: "success", message: session.state };
        }
      }
    } else {
      return { result: "error", message: "NOTFOUND" };
    }
  } //getQrcode

  static async sendText(sessionName, number, text) {
    var session = Sessions.getSession(sessionName);
    if (session) {
      let checar = Sessions.setConnection(sessionName); //Obriga a mudar para CONNECTED
      if (session.state == "CONNECTED" || session.state == "CONFLICT") {
        // Corrigir conflito
        var resultSendText = await session.client.then(async (client) => {
          if (session.state == "CONFLICT") {
            client.useHere();
          } // Forçar uso.
          const user = await client.getNumberProfile(number + "@c.us");
          console.log(user);

          const messages = await client.getAllUnreadMessages();
          console.log("Mensagens", messages);

          return await client.sendText(number + "@c.us", text);
        });
        return { result: "success" };
      } else {
        return { result: "error", message: session.state };
      }
    } else {
      return { result: "error", message: "NOTFOUND" };
    }
  } //Envia texto

  static async sendLinkPreview(sessionName, number, link, title) {
    var session = Sessions.getSession(sessionName);
    if (session) {
      let checar = Sessions.setConnection(sessionName); //Obriga a mudar para CONNECTED
      if (session.state == "CONNECTED" || session.state == "CONFLICT") {
        var resultSendLinkPreview = await session.client.then(
          async (client) => {
            if (session.state == "CONFLICT") {
              client.useHere();
            } // Forçar uso.
            return await client.sendLinkPreview(number + "@c.us", link, title);
          }
        );
        return { result: "success" };
      } else {
        return { result: "error", message: session.state };
      }
    } else {
      return { result: "error", message: "NOTFOUND" };
    }
  } //Envia link

  static async sendLocation(sessionName, number, long, lat, endereco) {
    var session = Sessions.getSession(sessionName);
    if (session) {
      let checar = Sessions.setConnection(sessionName); //Obriga a mudar para CONNECTED
      if (session.state == "CONNECTED" || session.state == "CONFLICT") {
        var resultSendLocation = await session.client.then(async (client) => {
          if (session.state == "CONFLICT") {
            client.useHere();
            setTimeout(async function () {
              console.log("Forçado a conexão.");
              console.log("Localiza enviada para: " + number);
              return await client.sendLocation(
                number + "@c.us",
                long,
                lat,
                endereco
              );
            }, 5000);
          } else {
            console.log("Contato enviado para: " + number);
            return await client.sendLocation(
              number + "@c.us",
              long,
              lat,
              endereco
            );
          }
        });
        return { result: "success" };
      } else {
        return { result: "error", message: session.state };
      }
    } else {
      return { result: "error", message: "NOTFOUND" };
    }
  } //Envia Localização

  static async sendContactVcard(sessionName, number, contact, cname, i) {
    var session = Sessions.getSession(sessionName);
    if (i == 0) {
      number = number + "@c.us";
    }

    if (session) {
      let checar = Sessions.setConnection(sessionName); //Obriga a mudar para CONNECTED
      if (session.state == "CONNECTED" || session.state == "CONFLICT") {
        var resultSendContactVcard = await session.client.then(
          async (client) => {
            if (session.state == "CONFLICT") {
              client.useHere();
              setTimeout(async function () {
                console.log("Forçado a conexão.");
                console.log("Contato enviado para: " + number);
                return await client.sendContactVcard(
                  number /*+ '@c.us'*/,
                  contact + "@c.us",
                  cname
                );
              }, 5000);
            } else {
              console.log("Contato enviado para: " + number);
              return await client.sendContactVcard(
                number /*+ '@c.us'*/,
                contact + "@c.us",
                cname
              );
            } // Forçar uso.
          }
        );
        return { result: "success" };
      } else {
        return { result: "error", message: session.state };
      }
    } else {
      return { result: "error", message: "NOTFOUND" };
    }
  } //Envia Contato

  static async sendImage(sessionName, number, path, imgname, caption, i) {
    var session = Sessions.getSession(sessionName);
    if (i == 0) {
      number = number + "@c.us";
    }

    console.log("O numero é:", number);
    if (session) {
      let checar = Sessions.setConnection(sessionName); //Obriga a mudar para CONNECTED
      if (session.state == "CONNECTED" || session.state == "CONFLICT") {
        var resultImage = await session.client.then(async (client) => {
          if (session.state == "CONFLICT") {
            client.useHere();
          } // Forçar uso.
          return await client.sendImage(number, path, imgname, caption);
        });
        return { result: "success" };
      } else {
        return { result: "error", message: session.state };
      }
    } else {
      return { result: "error", message: "NOTFOUND" };
    }
  } //Envia Imagem

  static async sendFile(sessionName, number, path, filename, caption) {
    var session = Sessions.getSession(sessionName);
    if (session) {
      let checar = Sessions.setConnection(sessionName); //Obriga a mudar para CONNECTED
      if (session.state == "CONNECTED" || session.state == "CONFLICT") {
        var resultSendFile = await session.client.then(async (client) => {
          //Se for grupo, vai retirar o @c.us
          number = number + "@c.us";
          number = number.replace(/@g\.us@c\.us/gm, "@g.us");
          number = number.replace(/@c\.us@c\.us/gm, "@c.us");

          if (session.state == "CONFLICT") {
            setTimeout(client.useHere(), 5000);
            return await client.sendFile(number, path, filename, caption);
            console.log("Arquivo", path, "enviado para", number);
          } else {
            return await client.sendFile(number, path, filename, caption);
            console.log("Arquivo", path, "enviado para", number);
          } // Forçar uso.
        });
        return { result: "success" };
      } else {
        return { result: "error", message: session.state };
      }
    } else {
      return { result: "error", message: "NOTFOUND" };
    }
  } //Envia Documentos
};
