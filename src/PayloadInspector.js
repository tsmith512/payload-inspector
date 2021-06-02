import { Button, Box } from '@material-ui/core';
import React, { useState } from 'react';

import PayloadInput from './PayloadInput';
import splitPayload from './splitPayload';

class PayloadInspector extends React.Component {
  constructor(props) {
    super(props);

    this.samplePayload = {
      string: '{"foo":"bar"}',
      keys: splitPayload('{"foo":"bar"}'),
    };

    this.state = {
      payloads: [this.samplePayload],
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleAdd() {
    this.setState({
      payloads: this.state.payloads.concat([this.samplePayload]),
    });
  }

  handleUpdate(newValue, index) {
    const newState = this.state;

    newState.payloads[index] = {
      value: newValue,
      keys: splitPayload(newValue),
    };

    this.setState(newState);
  }

  render() {
    const payloadPages = this.state.payloads.map((payload, index) => (
      <PayloadInput
        key={index.toString()}
        index={index}
        value={payload.string}
        containedKeys={payload.keys}
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
