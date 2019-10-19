import React from "react";
import PropTypes from "prop-types";
import { Box, Button, RangeInput, Text } from "grommet";

const Controls = props => {
  const { doReset, numLevels, setNumLevels } = props;

  return (
    <Box>
      <RangeInput
        value={numLevels}
        onChange={event => setNumLevels(event.target.value)}
      />
      <Text>{numLevels}</Text>

      <Button label="Reset" onClick={doReset} />
    </Box>
  );
};

Controls.prototype = {
  doReset: PropTypes.func.isRequired,
  numLevels: PropTypes.number.isRequired,
  setNumLevels: PropTypes.func.isRequired
};

export default Controls;
