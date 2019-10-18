import React from "react";
import { Box, Distribution, Text } from "grommet";

const Visualization = () => {
  const ratioArray = [[70, 30], [90, 10], [50, 50]];

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

      <Box width="50%">
        {ratioArray.map(ratios => (
          <Box
            margin={{
              vertical: "10px"
            }}
          >
            <Distribution
              values={[
                { value: ratios[0], color: "light-3" },
                { value: ratios[1], color: "brand" }
              ]}
            >
              {value => (
                <Box pad="small" background={value.color} fill>
                  <Text size="large">{value.value}</Text>
                </Box>
              )}
            </Distribution>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Visualization;
