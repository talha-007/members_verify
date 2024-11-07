import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';
import authService from 'src/redux/api/userServices';

import Iconify from 'src/components/iconify';

import Logo from '../../../public/assets/logo.png';

// ----------------------------------------------------------------------

const initialValues = {
  username: '',
  password: '',
};
export default function LoginView() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validations({ [name]: value });
  };

  const validations = (fieldValue = values) => {
    const temp = { ...errors };

    if ('username' in fieldValue)
      temp.username = fieldValue.username ? '' : 'This Field is Required';
    if ('password' in fieldValue)
      temp.password = fieldValue.password ? '' : 'This Field is Required';

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === '');
  };

  const handleSubmit = async () => {
    const datas = {
      ...values,
    };
    if (validations()) {
      setIsLoading(true);
      try {
        const res = await authService.login(datas);

        if (res?.status === 200) {
          setIsLoading(false);
          toast.success(res?.data?.message);
          setValues(initialValues);
          navigate('/');
          localStorage.setItem('token', res?.data?.token);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="username"
          value={values.username}
          error={Boolean(errors?.username)}
          helperText={errors?.username}
          label="Username"
          onChange={handleOnChange}
        />

        <TextField
          name="password"
          label="Password"
          value={values.password}
          error={Boolean(errors?.password)}
          onChange={handleOnChange}
          helperText={errors?.password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit}
        isLoading={isLoading}
        sx={{ marginTop: '1.5rem' }}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Box sx={{ width: '60px', paddingLeft: '1rem', paddingTop: '1rem', position: 'absolute' }}>
        <img src={Logo} alt="logo" />
      </Box>

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
            Sign in
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
