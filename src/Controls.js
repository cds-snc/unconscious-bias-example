import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Heading, FormField, RangeInput } from "grommet";
import { Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";

const Controls = props => {
  const {
    doReset,
    bias,
    setBias,
    simulationSpeed,
    setSimulationSpeed,
    // attritionRate,
    // setAttritionRate,
    isSimulationRunning,
    toggleIsSimulationRunning
  } = props;

  return (
    <I18n>
      {({ i18n }) => (
        <Box width="medium">
          <Box>
            <Heading
              level={2}
              size="small"
              margin={{ bottom: "large" }}
              textAlign="center"
            >
              <Trans>Bias</Trans>: {bias}% &nbsp; &nbsp;
              <Trans>Speed</Trans>: {simulationSpeed}
              {/* <Trans>Attrition</Trans>: {attritionRate}% */}
            </Heading>
          </Box>

          <FormField label={i18n._("Bias")}>
            <RangeInput
              label="Bias"
              min={0}
              max={10}
              value={bias}
              onChange={event => setBias(parseInt(event.target.value))}
            />
          </FormField>

          <FormField label={i18n._("Speed")}>
            <RangeInput
              label="Speed"
              min={0}
              max={100}
              value={simulationSpeed}
              onChange={event => setSimulationSpeed(parseInt(event.target.value))}
            />
          </FormField>
          
          {/* <FormField label={i18n._("Attrition")}>
            <RangeInput
              label="AttritionRate"
              min={0}
              max={25}
              value={attritionRate}
              onChange={event => setAttritionRate(parseInt(event.target.value))}
            />
          </FormField> */}

          <Box
            direction="row"
            gap="medium"
            justify="center"
            margin={{ vertical: "medium" }}
          >
            <Button label={i18n._("Reset")} onClick={doReset} />
            <Button
              label={isSimulationRunning ? i18n._("Stop") : i18n._("Start")}
              onClick={toggleIsSimulationRunning}
            />
          </Box>
        </Box>
      )}
    </I18n>
  );
};

Controls.prototype = {
  doReset: PropTypes.func.isRequired,
  bias: PropTypes.number.isRequired,
  setBias: PropTypes.func.isRequired,
  simulationSpeed: PropTypes.func.isRequired,
  setSimulationSpeed: PropTypes.func.isRequired,
  attritionRate: PropTypes.number.isRequired,
  setAttritionRate: PropTypes.func.isRequired,
  isSimulationRunning: PropTypes.bool.isRequired,
  toggleIsSimulationRunning: PropTypes.func.isRequired
};

export default Controls;
