import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import PayloadInspector from './PayloadInspector';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Payload Inspector</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <PayloadInspector></PayloadInspector>
      </Container>
    </React.Fragment>
  );
}

export default App;
