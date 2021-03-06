import { Paper, Button, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import React from 'react';

import PayloadInput from './PayloadInput';
import splitPayload from './splitPayload';

class PayloadInspector extends React.Component {
  constructor(props) {
    super(props);

    this.samplePayload = {
      label: 'Sample Payload',
      string: '{"foo":"bar"}',
      keys: splitPayload('{"foo":"bar"}'),
    };

    this.state = {
      payloads: [this.samplePayload],
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handlePretty = this.handlePretty.bind(this);
  }

  handleAdd() {
    this.setState({
      payloads: this.state.payloads.concat([this.samplePayload]),
    });
  }

  handleUpdate(newValue, index, propToChange) {
    const newState = this.state;

    newState.payloads[index] = {
      label: (propToChange === 'label') ? newValue : this.state.payloads[index].label,
      string: (propToChange === 'string') ? newValue : this.state.payloads[index].string,
      keys: (propToChange === 'string') ? splitPayload(newValue) : this.state.payloads[index].keys,
    };

    this.setState(newState);
  }

  handlePretty() {
    const newState = this.state;

    newState.payloads.forEach((payload, index, payloads) => {
      try {
        const object = JSON.parse(payload.string);
        newState.payloads[index].string =  JSON.stringify(object, null, 2);
      }
      catch (e) {
        // @TODO: Silently fail, don't try to prettify busted JSON.
      }
    });

    this.setState(newState);
  }

  render() {
    const payloadPages = this.state.payloads.map((payload, index) => (
      <PayloadInput
        key={index.toString()}
        index={index}
        label={payload.label}
        value={payload.string}
        onUpdate={this.handleUpdate}
        containedKeys={payload.keys}
        />
    ));

    // Make a big pile of all payload keys
    const payloadAggregate = this.state.payloads.map((payload, index) => (payload.keys)).flat().sort();

    // Filter for uniques
    const payloadUnion = payloadAggregate.filter((val, i, self) => {
      return self.indexOf(val) === i;
    })

    // Now count how many payloads include each unique
    const countedKeys = {};
    payloadAggregate.forEach((key) => {
      countedKeys[key] = (countedKeys[key] || 0) + 1;
    });

    // And how many payloads do we have in total
    const totalPayloads = this.state.payloads.length;

    const detailsTable = (
      <TableContainer component={Paper} style={{margin: 16}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Key Path</TableCell>
              <TableCell>Total: {totalPayloads}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payloadUnion.map((key) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>
                  <Typography paragraph>
                    {(countedKeys[key] === totalPayloads) && "??? "}
                    {(countedKeys[key] !== totalPayloads) && "???? "}
                    {countedKeys[key]} of {totalPayloads}
                  </Typography>
                  {(countedKeys[key] !== totalPayloads) && (<React.Fragment>
                    Not found in: {this.state.payloads.filter(p => p.keys.indexOf(key) === -1).map(q => q.label).join(', ')}
                  </React.Fragment>)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

    return (
      <React.Fragment>
        <Box m={2}>
          <Button
            variant="contained" color="primary" style={{marginRight: "1em"}}
            onClick={this.handleAdd}>Add Payload</Button>
          <Button
            variant="outlined" color="primary" style={{marginRight: "1em"}}
            onClick={this.handlePretty}>Pretty Print All</Button>
        </Box>
        {payloadPages}

        {detailsTable}

      </React.Fragment>
    )
  }
}

export default PayloadInspector;
