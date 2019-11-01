import React, { useState, useEffect } from "react";
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
  const [numLevels, setNumLevels] = useState(7);
  const [employeesPerLevel, setEmployeesPerLevel] = useState([
    4000,
    1000,
    200,
    40,
    10,
    5,
    1
  ]);
  const [levels, setLevels] = useState([]);
  const [bias, setBias] = useState(10);
  const [attritionRate, setAttritionRate] = useState(15);
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
    setLevels(newLevels);
    setTime(0);
  };

  const stepSimulation = () => {
    setTime(time + 1);
    setLevels(stepAllLevels(levels, attritionRate, bias));
  };

  useEffect(reset, []);

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
                bias={bias}
                setBias={setBias}
                attritionRate={attritionRate}
                setAttritionRate={setAttritionRate}
                stepSimulation={stepSimulation}
              />
            </Box>
            <Text margin={{ top: "medium", bottom: "small" }}>
              Time: {time}
            </Text>
            <Visualization countArray={countArray} />
          </Box>
        </Box>
      </Grommet>
    </I18nProvider>
  );
};

export default App;
