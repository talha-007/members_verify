import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import authService from 'src/redux/api/userServices';

import ListPage from 'src/sections/list/view/list-view';

import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const [isLoading, setIsLoading] = useState(true);
  const [isdata, setData] = useState([]);

  console.log(isdata);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await authService.getStats();

      if (res.status === 200) {
        setIsLoading(false);
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>
      {isLoading ? (
        'loading...'
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total Members"
                total={isdata?.stats?.totalUsers}
                color="success"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Pending Emails to sent"
                total={isdata?.stats?.emailNotSent}
                color="info"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
              />
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Pending Forms to submit"
                total={isdata?.stats?.notSubmittedForm}
                color="info"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Expired Ids"
                total={isdata?.stats?.expired}
                color="warning"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Upcoming Expirations"
                total={isdata?.stats?.upcomingExpirations}
                color="error"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: '3.5rem' }}>
            <ListPage />
          </Box>
        </>
      )}
    </Container>
  );
}
