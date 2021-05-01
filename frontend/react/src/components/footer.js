/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: footer.js
 * Description: Copyright
 * Data: 30/04/2021
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">Fabio Luis</Link> {new Date().getFullYear()}
      {''}
    </Typography>
  );
}

export default Copyright;
