import { Helmet } from 'react-helmet-async';

import OnBoarding from 'src/sections/onboarding/OnBoarding';

// ----------------------------------------------------------------------

export default function OnBoardingPage() {
  return (
    <>
      <Helmet>
        <title> Onboarding Members | Members Verify </title>
      </Helmet>
      <OnBoarding />
    </>
  );
}
