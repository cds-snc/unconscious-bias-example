import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Heading, FormField, RangeInput } from "grommet";

const Controls = props => {
  const {
    doReset,
    numLevels,
    setNumLevels,
    bias,
    setBias,
    startSimulation,
    pauseSimulation
  } = props;

  return (
    <Box>
      <Heading level={2} size="small" margin={{ bottom: "large" }}>
        Levels: {numLevels} &nbsp; &nbsp; Bias: {bias}%
      </Heading>

      <FormField name="levels" label="Number of Levels">
        <RangeInput
          min={2}
          max={10}
          value={numLevels}
          onChange={event => setNumLevels(parseInt(event.target.value))}
        />
      </FormField>
      <FormField label="Bias">
        <RangeInput
          label="Num Levels"
          min={0}
          max={10}
          value={bias}
          onChange={event => setBias(parseInt(event.target.value))}
        />
      </FormField>

      <Box direction="row" gap="medium" margin={{ vertical: "medium" }}>
        <Button label="Reset" onClick={doReset} />
        <Button label="Go" onClick={startSimulation} />
        <Button label="Pause" onClick={pauseSimulation} />
      </Box>
    </Box>
  );
};

Controls.prototype = {
  doReset: PropTypes.func.isRequired,
  numLevels: PropTypes.number.isRequired,
  setNumLevels: PropTypes.func.isRequired,
  bias: PropTypes.number.isRequired,
  setBias: PropTypes.func.isRequired,
  startSimulation: PropTypes.func.isRequired,
  pauseSimulation: PropTypes.func.isRequired
};

export default Controls;
