import '@lottiefiles/lottie-player';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

import { Box, Grid, Button, Container, TextField, Typography } from '@mui/material';

import authService from 'src/redux/api/userServices';

// import fincenLogo from '../../assets/Fincen.png';
import Logo from '../../../public/assets/logo.png';
import LottieComponent from '../../components/lottie';
import successAnimation from '../../assets/success.json';

const initialValues = {
  fullname: '',
  address: '',
  identification: '',
  idImage: null,
  dob: '',
};

const OnBoarding = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      // Handle file input
      setValues({
        ...values,
        [name]: files[0], // Store the file object
      });
      validations({ [name]: files[0] });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
      validations({ [name]: value });
    }
  };

  const validations = (fieldValue = values) => {
    const temp = { ...errors };

    // Validate fullname
    if ('fullname' in fieldValue)
      temp.fullname = fieldValue.fullname ? '' : 'This Field is Required';

    // Validate address
    if ('address' in fieldValue) temp.address = fieldValue.address ? '' : 'This Field is Required';

    // Validate identification
    if ('identification' in fieldValue)
      temp.identification = fieldValue.identification ? '' : 'This Field is Required';

    // Validate idImage
    if ('idImage' in fieldValue) temp.idImage = fieldValue.idImage ? '' : 'This Field is Required';

    // Validate dob
    if ('dob' in fieldValue) temp.dob = fieldValue.dob ? '' : 'This Field is Required';

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === '');
  };

  const handleSubmit = async () => {
    const datas = {
      ...values,
    };
    try {
      setIsLoading(true);
      if (validations) {
        const res = await authService.create(datas);
        console.log(res);
        if (res.status === 201) {
          setIsLoading(false);
          toast.success(res?.data?.message);
          setShowSuccess(true);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #2C3840 50%, #12808D 50%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: { xs: '8rem 0rem', md: '0rem' },
      }}
    >
      <Box sx={{ width: '70px', position: 'absolute', top: '20px', left: '20px' }}>
        <img src={Logo} alt="logo" />
      </Box>
      <Container>
        <Box
          sx={{
            borderRadius: '12px',
            boxShadow: '2px 4px 10px rgba(0,0,0, .2)',
            background: '#fff',
            padding: '3rem',
            minHeight: '75vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              {showSuccess ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <LottieComponent LoderData={successAnimation} />
                  <Typography>Thank You!</Typography>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: '1.5rem', textAlign: 'center' }}>
                      Required Information
                    </Typography>
                  </Grid>

                  {/* Full Name */}
                  <Grid item xs={12}>
                    <Typography sx={{ paddingLeft: '10px', fontSize: '12px' }}>
                      Full Name
                    </Typography>
                    <TextField
                      value={values.fullname}
                      error={Boolean(errors?.fullname)}
                      helperText={errors?.fullname}
                      name="fullname"
                      fullWidth
                      onChange={handleOnChange}
                    />
                  </Grid>
                  {/* Date of Birth */}
                  <Grid item xs={12}>
                    <Typography sx={{ paddingLeft: '10px', fontSize: '12px' }}>
                      Date of Birth
                    </Typography>
                    <TextField
                      type="date"
                      value={values.dob}
                      error={Boolean(errors?.dob)}
                      helperText={errors?.dob}
                      name="dob"
                      fullWidth
                      onChange={handleOnChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  {/* address */}
                  <Grid item xs={12}>
                    <Typography sx={{ paddingLeft: '10px', fontSize: '12px' }}>Address</Typography>
                    <TextField
                      value={values.address}
                      error={Boolean(errors?.address)}
                      helperText={errors?.address}
                      name="address"
                      fullWidth
                      onChange={handleOnChange}
                    />
                  </Grid>

                  {/* Identification Number */}
                  <Grid item xs={12}>
                    <Typography sx={{ paddingLeft: '10px', fontSize: '12px' }}>
                      Identification Number
                    </Typography>
                    <TextField
                      value={values.identification}
                      error={Boolean(errors?.identification)}
                      helperText={errors?.identification}
                      name="identification"
                      fullWidth
                      onChange={handleOnChange}
                    />
                  </Grid>

                  {/* ID Image Upload */}
                  <Grid item xs={12}>
                    <Typography sx={{ paddingLeft: '10px', fontSize: '12px' }}>
                      Upload ID Image
                    </Typography>
                    <input
                      type="file"
                      name="idImage"
                      accept="image/*"
                      onChange={handleOnChange}
                      style={{ display: 'block', marginTop: '8px' }}
                    />
                    {errors.idImage && (
                      <Typography sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.idImage}
                      </Typography>
                    )}
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12} mt={2}>
                    <Box textAlign="center">
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                          padding: '10px 20px',
                          backgroundColor: '#12808D',
                          color: '#fff',
                          '&:hover': {
                            backgroundColor: '#0e6b74',
                          },
                        }}
                      >
                        {isLoading ? 'loaidng...' : 'Submit'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default OnBoarding;
