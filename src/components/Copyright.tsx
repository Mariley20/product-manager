import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props:any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/marileye/" target="_blank">
        Mariley
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
