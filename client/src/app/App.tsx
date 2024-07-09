import React from 'react';

import WithInterceptor from './providers/WithInterceptor';
import Providers from './providers';

const App = () => {
  return (
    <WithInterceptor>
      <Providers />
    </WithInterceptor>
  );
};

export default App;
