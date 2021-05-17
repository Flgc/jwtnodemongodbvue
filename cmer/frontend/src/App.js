/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: App.js
 * Description: Arquivo principal do FrontEnd
 * Data: 17/05/2021
 */

import React from 'react';
import Inicio from './pages/client/painel';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>APP</h1>
      </header> */}
      <Inicio />
    </div>
  );
}

export default App;
