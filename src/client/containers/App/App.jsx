import React from 'react';
import Snackbar from 'containers/Snackbar';
import ChartsPage from 'containers/Charts';
import AppBar from './AppBar';
import './index.scss';

const App = () => (
  <>
    <AppBar />
    <div className="app-content">
      <div className="container">
        <div className="content-pane">
          <ChartsPage />
        </div>
      </div>
    </div>
    <Snackbar />
  </>
);

export default App;
