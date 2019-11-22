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
      <Box
        direction="row"
        flex
        margin={{
          vertical: "5px"
        }}
      >
        <Box width="110px" align="end">
          <Text margin={{ right: "5px" }}>
            <Trans>Employees</Trans>&nbsp;&nbsp;
          </Text>
        </Box>
        <Box direction="row" flex>
          <Box width="50%">
            <Text weight="bold" size="large" color="femaleBars">
              <Trans>Female</Trans>
            </Text>
          </Box>
          <Box width="50%" align="end">
            <Text weight="bold" size="large" color="maleBars">
              <Trans>Male</Trans>
            </Text>
          </Box>
        </Box>
      </Box>

      {ratioArray.map((ratios, index) => (
        <Box
          key={index}
          direction="row"
          flex
          margin={{
            vertical: "5px"
          }}
        >
          <Box width="110px" align="end">
            <Text margin={{ right: "5px" }}>
              {countArray[index][0] + countArray[index][1]}&nbsp;&nbsp;
            </Text>
          </Box>
          <Box direction="row" flex>
            <Box width={`${ratios[0]}%`} background="femaleBars" align="end">
              {ratios[0] > 5 ? (
                <Text margin={{ left: "5px" }} size="large">
                  {`${Math.round(ratios[0])}%`}&nbsp;
                </Text>
              ) : null}
            </Box>
            <Box width={`${ratios[1]}%`} background="maleBars">
              {ratios[1] > 5 ? (
                <Text margin={{ right: "5px" }} size="large">
                  &nbsp;{`${Math.round(ratios[1])}%`}
                </Text>
              ) : null}
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
