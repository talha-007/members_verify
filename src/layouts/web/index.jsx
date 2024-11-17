import React from 'react';
import { Outlet } from 'react-router-dom';

import { Stack } from '@mui/material';

const WebLayout = () => (
  <Stack className="stacksdf" sx={{ marginTop: { xs: '2rem', md: '0rem' } }}>
    <Outlet />
  </Stack>
);

export default WebLayout;
