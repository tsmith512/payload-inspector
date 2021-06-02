import { Box, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import splitPayload from './splitPayload';

const PayloadInput = ({index}) => {
  const [payload, setPayload] = useState(['Waiting for input.']);

  const testInput = (input) => {
    const processedPayload = splitPayload(input);
    setPayload((processedPayload) ? processedPayload : ['Invalid JSON']);
  }

  return (
    <Paper style={{margin: 16}}>
      <Box width="100%" p={2}>
        <Typography variant="button" component="div">Payload #{index}</Typography>
      </Box>
      <Box display="flex" width="100%">
        <Box flexGrow={1} p={2} width="50%">
          <Typography variant="h5" paragraph>Input Payload</Typography>
          <TextField
            label="Input FSL Payload"
            multiline
            fullWidth
            size="small"
            margin="normal"
            variant="outlined"
            onChange={(e) => (testInput(e.target.value))} />
        </Box>
        <Box flexGrow={1} p={2} width="50%">
          <Typography variant="h5" paragraph>Output</Typography>
          <ul>
            {payload.map((line, num) => {return <li key={num}>{line}</li>})}
          </ul>
        </Box>
      </Box>
    </Paper>
  );

}

export default PayloadInput;
