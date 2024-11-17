import dayjs from 'dayjs';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  email,
  memberType,
  association,
  assocCode,
  dob,
  lastName,
  idExpiry,
  identification,
  address,
  info,
  formSubmit,
  handleClick,
  emailSent,
  handleOpenEmailDialog,
  onDelete,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell component="th" scope="row">
          <Typography>{assocCode}</Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography
            sx={{
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '200px', // Adjust the max-width as per your design
              '&:hover': {
                whiteSpace: 'normal', // Allow text to wrap on hover
                overflow: 'visible', // Show the full text
                textOverflow: 'clip', // Remove the ellipsis on hover
              },
            }}
          >
            {association}
          </Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography sx={{ display: 'block', maxWidth: '200px' }}>{name}</Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography>{lastName}</Typography>
        </TableCell>

        <TableCell>
          <Typography
            sx={{
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '300px', // Adjust the max-width as per your design
              '&:hover': {
                whiteSpace: 'normal', // Allow text to wrap on hover
                overflow: 'visible', // Show the full text
                textOverflow: 'clip', // Remove the ellipsis on hover
              },
            }}
          >
            {email}
          </Typography>
        </TableCell>
        <TableCell>{dayjs(dob).format('MMMM D, YYYY')}</TableCell>

        <TableCell>
          <Typography
            sx={{
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '200px', // Adjust the max-width as per your design
              '&:hover': {
                whiteSpace: 'normal', // Allow text to wrap on hover
                overflow: 'visible', // Show the full text
                textOverflow: 'clip', // Remove the ellipsis on hover
              },
            }}
          >
            {address}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography> {identification}</Typography>
        </TableCell>
        <TableCell>
          {info ? (
            <Iconify icon="charm:circle-tick" color="green" />
          ) : (
            <Iconify icon="charm:circle-cross" color="red" />
          )}
        </TableCell>
        <TableCell>
          {emailSent ? (
            <Iconify icon="charm:circle-tick" color="green" />
          ) : (
            <Iconify icon="charm:circle-cross" color="red" />
          )}
        </TableCell>
        <TableCell>
          {formSubmit ? (
            <Iconify icon="charm:circle-tick" color="green" />
          ) : (
            <Iconify icon="charm:circle-cross" color="red" />
          )}
        </TableCell>
        <TableCell>
          <IconButton
            sx={{ fontSize: '.75rem', borderRadius: '8px', fontWeight: 'bold', background: '#eee' }}
            onClick={handleOpenEmailDialog}
          >
            Reminder
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  idExpiry: PropTypes.any,
  handleClick: PropTypes.func,
  lastName: PropTypes.any,
  association: PropTypes.any,
  assocCode: PropTypes.any,
  info: PropTypes.any,
  dob: PropTypes.any,
  identification: PropTypes.any,
  address: PropTypes.any,
  name: PropTypes.any,
  selected: PropTypes.any,
  email: PropTypes.any,
  onDelete: PropTypes.any,
  emailSent: PropTypes.any,
  handleOpenEmailDialog: PropTypes.any,
  formSubmit: PropTypes.any,
  memberType: PropTypes.string,
};
