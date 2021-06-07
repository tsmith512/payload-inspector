import React from 'react';
import { Box, Paper, TextField, Typography } from '@material-ui/core';

class PayloadInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(e) {
    this.props.onUpdate(e.target.value, this.props.index, e.target.name);
  }

  render() {
    return (
      <Paper style={{margin: 16, width: "100%"}}>
        <Box width="100%" p={2}>
          <Typography variant="button" component="div">Payload #{this.props.index}</Typography>
        </Box>

        {/* The input field for the FSL JSON */}
        <Box display="flex" width="100%">
          <Box flexGrow={1} p={2} width="50%">
            <Typography variant="h5" paragraph>Input Payload</Typography>
            <TextField
              label="Label"
              name="label"
              fullWidth
              size="medium"
              margin="normal"
              value={this.props.label}
              onChange={this.handleUpdate} />

            <TextField
              label="Payload"
              name="string"
              multiline
              fullWidth
              size="small"
              margin="normal"
              variant="outlined"
              value={this.props.value}
              onChange={this.handleUpdate} />
          </Box>

          {/* The output with the keys in this payload as a list */}
          <Box flexGrow={1} p={2} width="50%">
            <Typography variant="h5" paragraph>Output</Typography>
            <Typography variant="button" paragraph>{this.props.label}</Typography>
            <ul>
              {this.props.containedKeys.map((line, num) => {
                return <li key={num}>{line}</li>
              })}
            </ul>
          </Box>
        </Box>
      </Paper>
    );
  }
}

export default PayloadInput;
