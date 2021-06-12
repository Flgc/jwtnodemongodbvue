/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 * mecanicaBot
 *
 * file: src/components/footer-admin.js
 * Description:
 * Data: 17/05/2021
 */
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Flgc">
        Fábio Luis Guia da Conceição
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
