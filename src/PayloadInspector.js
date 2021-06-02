import { Button, Box } from '@material-ui/core';
import React, { useState } from 'react';

import PayloadInput from './PayloadInput';
import splitPayload from './splitPayload';

class PayloadInspector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payloads: ['{"foo": "bar"}'],
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleAdd() {
    this.setState({
      payloads: this.state.payloads.concat(['{"foo": "bar"}']),
    });
  }

  handleUpdate(newValue, index) {
    const newState = this.state;
    newState.payloads[index] = newValue;

    this.setState(newState);
  }

  render() {
    const payloadPages = this.state.payloads.map((value, index) => (
      <PayloadInput
        key={index.toString()}
        index={index}
        value={value}
        containedKeys={splitPayload(value)}
        onPayloadUpdate={this.handleUpdate}
        />
    ));

    return (
      <React.Fragment>
        {payloadPages}

        <Box p={2}>
          <Button
            variant="contained" color="primary"
            onClick={this.handleAdd}>Add Payload</Button>
        </Box>
      </React.Fragment>
    )
  }
}

export default PayloadInspector;
