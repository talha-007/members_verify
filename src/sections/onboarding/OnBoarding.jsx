import '@lottiefiles/lottie-player';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Grid,
  Stack,
  Button,
  Checkbox,
  Backdrop,
  Container,
  TextField,
  FormGroup,
  Typography,
  FormControlLabel,
} from '@mui/material';

import { encryptData } from 'src/hooks/crypto';

import authService from 'src/redux/api/userServices';

// import fincenLogo from '../../assets/Fincen.png';
import Logo from '../../../public/assets/logo.png';
import LottieComponent from '../../components/lottie';
import successAnimation from '../../assets/success.json';

const initialValues = {
  firstName: '',
  lastName: '',
  homeAddress: '',
  identification: '',
  idImage: null,
  dob: '',
};

const OnBoarding = () => {
  const { formToken } = useParams();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange = async (event) => {
    setChecked(event.target.checked);
    const encryptedData = encryptData(values);
    const datas = {
      encryptedData,
      idImage: values?.idImage,
      formToken,
    };

    try {
      setIsLoading(true);
      const res = await authService.submitForm(datas);

      if (res.status === 201) {
        setIsLoading(false);
        toast.success(res?.data?.message);
        setShowSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
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
    if ('firstName' in fieldValue)
      temp.firstName = fieldValue.firstName ? '' : 'This Field is Required';
    if ('lastName' in fieldValue)
      temp.lastName = fieldValue.lastName ? '' : 'This Field is Required';

    // Validate address
    if ('homeAddress' in fieldValue)
      temp.homeAddress = fieldValue.homeAddress ? '' : 'This Field is Required';

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
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    if (validations()) {
      if (!checked) {
        // Show the disclaimer if the user hasn't checked the box
        handleOpen();
      }
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
                  <Grid item xs={12} md={6}>
                    <Typography sx={{ paddingLeft: '10px', fontSize: '12px' }}>
                      First Name
                    </Typography>
                    <TextField
                      value={values.firstName}
                      error={Boolean(errors?.firstName)}
                      helperText={errors?.firstName}
                      name="firstName"
                      fullWidth
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography sx={{ paddingLeft: '10px', fontSize: '12px' }}>
                      Last Name
                    </Typography>
                    <TextField
                      value={values.lastName}
                      error={Boolean(errors?.lastName)}
                      helperText={errors?.lastName}
                      name="lastName"
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
                  {/* homeAddress */}
                  <Grid item xs={12}>
                    <Typography sx={{ paddingLeft: '10px', fontSize: '12px' }}>
                      Home Address
                    </Typography>
                    <TextField
                      value={values.homeAddress}
                      error={Boolean(errors?.homeAddress)}
                      helperText={errors?.homeAddress}
                      name="homeAddress"
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
      <Backdrop
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <Box
          sx={{
            borderRadius: '12px',
            boxShadow: '2px 4px 10px rgba(0,0,0, .2)',
            background: '#fff',
            padding: '3rem',
            minHeight: '75vh',
            display: 'flex',
            width: '400px',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Stack direction="column" spacing={2}>
            <Typography sx={{ fontWeight: 'bold' }}>Disclaimer</Typography>
            <Typography>
              By checking this box, I certify that the information provided in this form is true and
              correct. I have reviewed this information and confirm that it is accurate. I am
              responsible for uploading a valid identification document. I am also responsible for
              the accuracy of the information submitted on behalf of myself and my association.
              Failure to upload correct information may result in fines.
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label="I agree"
              />
            </FormGroup>
          </Stack>
        </Box>
      </Backdrop>
    </Box>
  );
};

export default OnBoarding;
