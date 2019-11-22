import React from "react";
import PropTypes from "prop-types";
import { Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import { Box, Heading, Button, Text } from "grommet";

const AppBar = props => {
  const { setLang } = props;

  return (
    <I18n>
      {({ i18n }) => (
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
        >
          <Box>
            <Heading level="1" size="small" margin="none">
              <Trans>Impact of bias on an organization</Trans>
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
        </Box>
      )}
    </I18n>
  );
};

AppBar.prototype = {
  setLang: PropTypes.func.isRequired
};

export default AppBar;
