import '@/styles/product-view.scss'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import reyna_logo from '@/assets/reyna_logo.jpg';

interface IDashboardCardProps {
  title: string
  quantity: number
}
function DashboardCard({ title, quantity }: IDashboardCardProps) {

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {quantity}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={reyna_logo}
        alt="Live from space album cover"
      />
    </Card>
  );
}
export default DashboardCard

