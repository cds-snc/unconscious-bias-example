import React from "react";
import { Box, Text } from "grommet";

const Visualization = () => {
  const ratioArray = [[30, 70], [40, 60], [50, 50]];

  return (
    <Box
      justify="center"
      align="center"
      direction="column"
      flex
      overflow={{ horizontal: "hidden" }}
    >
      <Box
        flex
        align="center"
        justify="center"
        pad={{ horizontal: "5%", top: "5%", bottom: "2%" }}
      >
        Controls
      </Box>

      <Box width="70%">
        {ratioArray.map((ratios, index) => (
          <Box
            direction="row"
            flex
            margin={{
              vertical: "5px"
            }}
          >
            <Text width="100px" margin={{ right: "5px" }}>
              Level {ratios.length - index + 1}
            </Text>
            <Box direction="row" flex>
              <Box width={`${ratios[0]}%`} background="light-3">
                <Text margin={{ left: "5px" }} size="large">
                  {ratios[0]}
                </Text>
              </Box>
              <Box width={`${ratios[1]}%`} background="brand" align="end">
                <Text margin={{ right: "5px" }} size="large">
                  {ratios[1]}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Visualization;
