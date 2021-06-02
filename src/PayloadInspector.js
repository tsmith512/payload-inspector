import { Button, Box } from '@material-ui/core';
import React, { useState } from 'react';

import PayloadInput from './PayloadInput';

class PayloadInspector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payloads: [{}],
    }
  }

  handleAdd() {
    this.setState({ payloads: this.state.payloads.concat([{}]) });
    console.log(this.state);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.payloads.map((value, index) => {
          return (<PayloadInput key={index.toString()} index={index} />);
        })}

        <Box p={2}>
          <Button variant="contained" color="primary" onClick={(e) => {this.handleAdd()}}>Add Payload</Button>
        </Box>

      </React.Fragment>
    )
  }
}

export default PayloadInspector;
