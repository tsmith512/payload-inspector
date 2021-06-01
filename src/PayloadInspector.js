import { Box, Paper, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';

/**
 *
 * @param {object} input - The object to inspect; the only required param
 * @param {string?} prefix - The current object path being inspected
 * @param {array?} list - The accumulator, a list of properties and keys discovered
 * @returns array list
 *
 * Thank you Tyler L, Brad B, and Tony S for helping me out here!
 */
const listKeys = (input, prefix, list) => {
  prefix = prefix || '';
  list = list || [];

  // Surprise: `null` is a value in a lot of these payloads but it is also an
  // object, which triggered recursion below. Bail out on any falsey input.
  if (!input) {
    return list;
  }

  // Run all of input's own enumerable property names
  Object.keys(input).forEach(key => {
    // In object notation, record where we are plus this key's name.
    let keyPath = prefix ? prefix + "." + key : key;

    // @TODO: Should this check for key or keyPath?
    if (list.indexOf(key) === -1) {
      list.push(keyPath);
    }

    // Inspect the contents of this item, if applicable
    if (["object", "array"].indexOf(typeof input[key]) !== -1) {
      listKeys(input[key], keyPath, list);
    }
  });
  return list;
}

const PayloadInspector: React.FC = () => {
  const [payload, setPayload] = useState("Waiting for input.");

  const testInput = (input) => {
    try {
      JSON.parse(input);
    } catch (e) {
      setPayload("...");
      return false;
    }

    const inspectedPayload = listKeys(JSON.parse(input)).sort();
    setPayload(inspectedPayload.join("\n"));
  }

  return (
    <Box display="flex" width="100%" marginY={2}>
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
        <Box component="pre" style={{whiteSpace: "pre-line"}}>
          {payload}
        </Box>
      </Box>
    </Box>
  )
}

export default PayloadInspector;
