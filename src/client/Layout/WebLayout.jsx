import React from 'react';
import { Outlet } from 'react-router-dom';

import { Stack } from '@mui/material';

const WebLayout = () => (
  <Stack>
    <Outlet />
  </Stack>
);

export default WebLayout;
