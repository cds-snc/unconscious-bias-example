import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "grommet";
import { Trans } from "@lingui/macro";

const Visualization = props => {
  const countArray = JSON.parse(JSON.stringify(props.countArray)).reverse();

  const ratioArray = countArray.map(([a, b]) => [
    (100 * a) / (a + b),
    (100 * b) / (a + b)
  ]);
  return (
    <Box width="70%">
      {ratioArray.map((ratios, index) => (
        <Box
          key={index}
          direction="row"
          flex
          margin={{
            vertical: "5px"
          }}
        >
          <Text width="100px" margin={{ right: "5px" }}>
            <Trans>Level</Trans> {ratioArray.length - index - 1}
          </Text>
          <Box direction="row" flex>
            <Box width={`${ratios[0]}%`} background="femaleBars">
              <Text margin={{ left: "5px" }} size="large">
                {countArray[index][0]}
              </Text>
            </Box>
            <Box width={`${ratios[1]}%`} background="maleBars" align="end">
              <Text color="white" margin={{ right: "5px" }} size="large">
                {countArray[index][1]}
              </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

Visualization.propTypes = {
  countArray: PropTypes.array.isRequired
};

export default Visualization;
