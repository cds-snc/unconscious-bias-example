import React, { useState } from "react";
import { Box, Grommet } from "grommet";
import { I18nProvider } from "@lingui/react";
import AppBar from "./AppBar";
import Controls from "./Controls";
import Visualization from "./Visualization";
import catalogEn from "./locales/en/messages.js";
import catalogFr from "./locales/fr/messages.js";

const theme = {
  global: {
    colors: {
      brand: "#228BE6"
    },

    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

const App = () => {
  const [lang, setLang] = useState("en");
  const [ratioArray, setRatioArray] = useState([[50, 50], [40, 60]]);
  const [numLevels, setNumLevels] = useState(5);
  const [bias, setBias] = useState(1);
  const [time, setTime] = useState(0);
  const [attrition, setAttrition] = useState(15);
  const [employees, setEmployees] = useState([]);

  const reset = () => {
    const newEmployees = [];
    for (let level = 0; level < numLevels; level++) {
      newEmployees.concat(
        [...Array(100).keys()].map(_ => getRandomEmployee(undefined, bias))
      );
    }
    setEmployees(newEmployees);
    setRatioArray();
  };

  const stepSimulation = () => {
    setTime(time + 1);
  };

  const startSimulation = () => {};

  const pauseSimulation = () => {};

  return (
    <I18nProvider language={lang} catalogs={{ en: catalogEn, fr: catalogFr }}>
      <Grommet theme={theme}>
        <Box fill>
          <AppBar setLang={setLang} />
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
              <Controls
                doReset={reset}
                numLevels={numLevels}
                setNumLevels={setNumLevels}
                bias={bias}
                setBias={setBias}
                startSimulation={startSimulation}
                pauseSimulation={pauseSimulation}
              />
            </Box>
            <Visualization ratioArray={ratioArray} />
          </Box>
        </Box>
      </Grommet>
    </I18nProvider>
  );
};

export default App;
