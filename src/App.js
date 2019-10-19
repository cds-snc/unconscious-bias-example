import React, { useState } from "react";
import { Box, Grommet, Text } from "grommet";
import { I18nProvider } from "@lingui/react";
import AppBar from "./AppBar";
import Controls from "./Controls";
import Visualization from "./Visualization";
import {
  countGenders,
  fillRandomly,
  stepAllLevels
} from "./utils/employeeUtils";
import { copy } from "./utils/miscUtils";
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
  const [numLevels, setNumLevels] = useState(3);
  const [employeesPerLevel, setEmployeesPerLevel] = useState([100, 30, 10]);
  const [levels, setLevels] = useState([]);
  const [bias, setBias] = useState(1);
  const [attritionRate, setAttritionRate] = useState(10);
  const [time, setTime] = useState(0);

  const reset = () => {
    let newLevels = [];
    for (let levelIndex = 0; levelIndex < numLevels; levelIndex++) {
      let newLevel = [...Array(employeesPerLevel[levelIndex]).keys()].map(
        _ => ({
          boxStatus: "vacant"
        })
      );
      newLevel = fillRandomly(newLevel, bias);
      newLevels.push(copy(newLevel));
    }
    console.log(newLevels);
    setLevels(newLevels);
  };

  const stepSimulation = () => {
    setTime(time + 1);
    setLevels(stepAllLevels(levels, attritionRate, bias));
  };

  const countArray = levels.map(level => countGenders(level));

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
                stepSimulation={stepSimulation}
              />
            </Box>
            <Text>Time: {time}</Text>
            <Visualization countArray={countArray} />
          </Box>
        </Box>
      </Grommet>
    </I18nProvider>
  );
};

export default App;
