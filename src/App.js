import React, { useState } from "react";
import { Box, Button, Grommet, Heading, Text } from "grommet";
import { Trans } from "@lingui/macro";
import { I18nProvider, I18n } from "@lingui/react";
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

const AppBar = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "medium", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

const App = () => {
  const [lang, setLang] = useState("en");

  return (
    <I18nProvider language={lang} catalogs={{ en: catalogEn, fr: catalogFr }}>
      <I18n>
        {({ i18n }) => (
          <Grommet theme={theme}>
            <Box fill>
              <AppBar>
                <Box>
                  <Heading level="1" size="small" margin="none">
                    <Trans>Unconscious Bias Example</Trans>
                  </Heading>
                </Box>

                <Box width="10%" direction="row" justify="end">
                  <Button
                    plain
                    label={
                      <Text size="medium">
                        <Trans>other-lang</Trans>
                      </Text>
                    }
                    onClick={() => {
                      setLang(i18n._("other-lang"));
                    }}
                  />
                </Box>
              </AppBar>

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

                <Box>Body</Box>
              </Box>
            </Box>
          </Grommet>
        )}
      </I18n>
    </I18nProvider>
  );
};

export default App;
