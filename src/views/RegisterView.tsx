import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IUserSignUp } from '@/types/userTypes';
import { useState } from 'react';
import Copyright from '@/components/Copyright';
import authFB from '@/services/authFB';

export default function RegisterView() {
  const [processingForm, setProcessingForm] = useState(false)

  const navigate = useNavigate();
  const form = useForm<IUserSignUp>({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      phonenumber: '',
      code: '',
      dni: '',
      role: 'sales',
      password: ''
    }
  })
  const { register, handleSubmit, formState } = form
  const { errors } = formState



  const onSubmit = async (data: IUserSignUp) => {
    try {
      const signUpData = {
        email: data.email, password: data.password
      }
      const userData = {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phonenumber: data.phonenumber,
        code: data.code,
        dni: data.dni,
        role: data.role,
      }
      setProcessingForm(true)
      const response = await authFB.registerAccount(signUpData, userData)
      console.log(response)
      navigate('/')

      return response
    } catch (error) {
      console.log(error)
    } finally {
      setProcessingForm(false)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...register('name', { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                {...register('lastname', { required: "Last name is required" })}
                error={!!errors.lastname}
                helperText={errors.lastname?.message || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="dni"
                required
                fullWidth
                id="dni"
                label="Document Number (DNI)"
                autoFocus
                {...register('dni', { required: "DNI is required" })}
                error={!!errors.dni}
                helperText={errors.dni?.message || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="phone_number"
                label="Phone Number"
                autoComplete="phone-number"
                {...register('phonenumber', { required: "Phone number is required" })}
                error={!!errors.phonenumber}
                helperText={errors.phonenumber?.message || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register('email', { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register('password', { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" checked />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={processingForm}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}