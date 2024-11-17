/* eslint-disable react/prop-types */
import { toast } from 'react-toastify';
import React, { useState } from 'react';

import {
  Grid,
  Dialog,
  Button,
  TextField,
  Typography,
  DialogContent,
  DialogActions,
} from '@mui/material';

import adminService from 'src/redux/api/adminServices';

import RichTextEditor from '../shared/RichTextEditor';

const initalEmailValues = {
  toEmail: '',
  subject: '',
  message: '',
};
const EmailDialog = ({ isOpen, setisOpen, email, handleClose, isID, setRefetch, refetch }) => {
  const [emailValues, setEmailValues] = useState(initalEmailValues);
  const [errors, setErrors] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setEmailValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    validations({ [name]: value });
  };

  const validations = (fieldValue = emailValues) => {
    const temp = { ...errors };

    // Email validation logic
    if ('toEmail' in fieldValue) {
      const emailToValidate = email || fieldValue.toEmail; // Use prop email if available
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailToValidate) {
        temp.toEmail = 'This Field is Required';
      } else if (!emailRegex.test(emailToValidate)) {
        temp.toEmail = 'Please enter a valid email address';
      } else {
        temp.toEmail = '';
      }
    }

    if ('subject' in fieldValue) temp.subject = fieldValue.subject ? '' : 'This Field is Required';

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === '');
  };

  const handleMessage = async () => {
    const datas = {
      ...emailValues,
      toEmail: email || emailValues.toEmail, // Use prop email if available
      message: emailBody.emailBody,
    };

    if (validations()) {
      try {
        const res = await adminService.sendEmail(isID, datas);
        console.log(res);

        if (res.status === 200) {
          toast.success(res.data.message);
          setisOpen(false);
          setRefetch(!refetch);
          setEmailValues(initalEmailValues);
          setEmailBody('');
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to send the email');
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        handleClose();
        setEmailValues(initalEmailValues);
        setEmailBody('');
      }}
      sx={{ overflow: 'hidden' }}
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>To</Typography>
            <TextField
              fullWidth
              name="toEmail"
              error={Boolean(errors?.toEmail)}
              helperText={errors?.toEmail}
              value={email || emailValues?.toEmail} // Use prop email or user input
              onChange={handleChangeEmail}
              disabled={!!email} // Disable the field if email prop is provided
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Subject</Typography>
            <TextField
              fullWidth
              name="subject"
              value={emailValues?.subject}
              error={Boolean(errors?.subject)}
              helperText={errors?.subject}
              onChange={handleChangeEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Write message...</Typography>
            <RichTextEditor title="emailBody" setBody={setEmailBody} body={emailBody} />
          </Grid>
        </Grid>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleMessage}>
            Send
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
