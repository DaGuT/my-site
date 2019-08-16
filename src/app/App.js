import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import IndexPage from './pages/index';

//for now It's just stateless App
const App = () => {
  return (
    <BrowserRouter>
      <Route component={IndexPage}/>
    </BrowserRouter>
  );
}

export default App;