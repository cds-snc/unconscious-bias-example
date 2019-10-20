import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "grommet";

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
            Level {ratioArray.length - index}
          </Text>
          <Box direction="row" flex>
            <Box width={`${ratios[0]}%`} background="light-3">
              <Text margin={{ left: "5px" }} size="large">
                {countArray[index][0]}
              </Text>
            </Box>
            <Box width={`${ratios[1]}%`} background="brand" align="end">
              <Text margin={{ right: "5px" }} size="large">
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
