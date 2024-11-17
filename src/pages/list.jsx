import { Helmet } from 'react-helmet-async';

import { ListView } from 'src/sections/list/view';

// ----------------------------------------------------------------------

export default function ListPage() {
  return (
    <>
      <Helmet>
        <title> List | Members Verify </title>
      </Helmet>

      <ListView />
    </>
  );
}
