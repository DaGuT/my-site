import React from 'react';
import ReactDOM from 'react-dom';
import IndexPage from './app/pages/index/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<IndexPage />, document.getElementById('root'));
registerServiceWorker();
