import { Box, Paper, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const PayloadInspector: React.FC = () => {
  const [payload, setPayload] = useState("Test");

  return (
    <Box display="flex" width="100%" marginY={16}>
      <Box flexGrow={1} p={2}>
        <Typography variant="h5" paragraph>Input Payload</Typography>
        <TextField
          label="Input FSL Payload"
          multiline
          variant="outlined"
          fullWidth
          onChange={(e) => (setPayload(e.target.value))} />
      </Box>
      <Box flexGrow={1} p={2}>
        <Typography variant="h5" paragraph>Output</Typography>
        <Box component="pre">
          {payload}
        </Box>
      </Box>
    </Box>
  )
}

export default PayloadInspector;
