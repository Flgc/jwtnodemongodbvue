/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: serviceWorker.js
 * Description: Responsável pelo resgistro dos Clientes "Workers" no frontend
 * Data: 30/04/2021
 */

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register('/sw.js')
        .then(function (registration) {
          // console.log(
          // 'ServiceWorker registration successful with scope: ',
          // registration.scope
          // );
        })
        .catch(function (err) {
          // registration failed :(
          // console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
};
