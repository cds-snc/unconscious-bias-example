import React from "react";
import { Box, Grommet } from "grommet";

const theme = {
  global: {
    colors: {
      brand: "#228BE6"
    },

    font: {
      family: "Roboto",
      size: "18px",
      height: "20px"
    }
  }
};

const AppBar = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

function App() {
  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>Unconscious Bias Example</AppBar>
        <Box direction="column">
          <Box
            background="light-2"
            elevation="small"
            align="center"
            justify="center"
            height="100px"
          >
            controls
          </Box>
          <Box margin="medium" align="center" justify="center">
            body
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
