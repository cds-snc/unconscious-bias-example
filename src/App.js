import React, { useState, useEffect } from "react";
import { Box, Grommet, Text } from "grommet";
import { I18nProvider } from "@lingui/react";
import { Trans } from "@lingui/macro";
import AppBar from "./AppBar";
import Controls from "./Controls";
import Visualization from "./Visualization";
import {
  countGenders,
  fillEqually,
  stepAllLevels
} from "./utils/employeeUtils";
import { copy, useInterval } from "./utils/miscUtils";
import catalogEn from "./locales/en/messages.js";
import catalogFr from "./locales/fr/messages.js";

const theme = {
  global: {
    borderSize: "0px",
    colors: {
      brand: "#000000",
      maleBars: "#DFE256",
      femaleBars: "#33B08E"
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
  const numLevels = 7;
  const employeesPerLevel = [4000, 1000, 200, 40, 10, 4, 1];
  const [levels, setLevels] = useState([]);
  const [bias, setBias] = useState(1);
  const [attritionRate, setAttritionRate] = useState(15);
  const [time, setTime] = useState(0);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);

  const reset = () => {
    setIsSimulationRunning(false);
    let newLevels = [];
    for (let levelIndex = 0; levelIndex < numLevels; levelIndex++) {
      let newLevel = [...Array(employeesPerLevel[levelIndex]).keys()].map(
        _ => ({
          boxStatus: "vacant"
        })
      );
      newLevel = fillEqually(newLevel, 0);
      newLevels.push(copy(newLevel));
    }
    setLevels(newLevels);
    setTime(0);
  };

  const stepSimulation = () => {
    if (isSimulationRunning) {
      setTime(time + 1);
      setLevels(stepAllLevels(levels, attritionRate, bias));
    }
  };

  // reset when app loads
  useEffect(reset, []);

  // start the simulation

  useInterval(() => {
    stepSimulation();
  }, 500);

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
              pad={{ horizontal: "5%", top: "medium", bottom: "small" }}
            >
              <Controls
                doReset={reset}
                bias={bias}
                setBias={setBias}
                attritionRate={attritionRate}
                setAttritionRate={setAttritionRate}
                isSimulationRunning={isSimulationRunning}
                toggleIsSimulationRunning={() =>
                  setIsSimulationRunning(!isSimulationRunning)
                }
              />
            </Box>
            <Visualization countArray={countArray} />
          </Box>

          <Text margin="large">
            <ul>
              <li>
                <Trans>
                  The Employees column gives the number of people at each level
                  of the organization (so at the top is the CEO).
                </Trans>
              </li>
              <li>
                <Trans>
                  Each employee has a {attritionRate}% chance of quitting each
                  year.
                </Trans>
              </li>
              <li>
                <Trans>
                  Vacancies are filled by promoting the top scoring worker from
                  the previous level.
                </Trans>
              </li>
              <li>
                <Trans>
                  The lowest level workers are randomly assigned a gender and a
                  score.
                </Trans>
              </li>
              <li>
                <Trans>
                  Female scores are randomly selected from the range [0, 100]
                </Trans>
              </li>
              <li>
                <Trans>
                  Male scores are randomly selected from the range [{bias},{" "}
                  {100 + bias}]
                </Trans>
              </li>
            </ul>
          </Text>
        </Box>
      </Grommet>
    </I18nProvider>
  );
};

export default App;
