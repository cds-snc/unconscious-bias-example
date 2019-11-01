import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Heading, FormField, RangeInput } from "grommet";

const Controls = props => {
  const {
    doReset,
    bias,
    setBias,
    attritionRate,
    setAttritionRate,
    stepSimulation
  } = props;

  return (
    <Box width="medium">
      <Box>
        <Heading
          level={2}
          size="small"
          margin={{ bottom: "large" }}
          textAlign="center"
        >
          Bias: {bias}% &nbsp; &nbsp; Attrition: {attritionRate}%
        </Heading>
      </Box>

      <FormField label="Bias">
        <RangeInput
          label="Num Levels"
          min={0}
          max={10}
          value={bias}
          onChange={event => setBias(parseInt(event.target.value))}
        />
      </FormField>

      <FormField label="Attrition">
        <RangeInput
          label="AttritionRate"
          min={0}
          max={25}
          value={attritionRate}
          onChange={event => setAttritionRate(parseInt(event.target.value))}
        />
      </FormField>

      <Box direction="row" gap="medium" margin={{ vertical: "medium" }}>
        <Button label="Reset" onClick={doReset} />
        <Button label="Step" onClick={stepSimulation} />
      </Box>
    </Box>
  );
};

Controls.prototype = {
  doReset: PropTypes.func.isRequired,
  bias: PropTypes.number.isRequired,
  setBias: PropTypes.func.isRequired,
  attritionRate: PropTypes.number.isRequired,
  setAttritionRate: PropTypes.func.isRequired,
  stepSimulation: PropTypes.func.isRequired
};

export default Controls;
