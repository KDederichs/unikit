import * as React from "react";
import * as PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import color from "color";

import styled, { useTheme } from "../styled";
import Hoverable from "../Hoverable";
import Ripple from "../Ripple";
import Box from "../Box";

import Progress from "../Progress";
import { isDark } from "../util";

const getBackground = ({ type, theme, isHovered, outlined, light }) => {
  if (outlined) {
    return isHovered
      ? color(theme.colors[type] || type)
          .alpha(0.1)
          .toString()
      : "transparent";
  }
  if (light) {
    return isHovered
      ? color(theme.colors[type] || type)
          .alpha(0.15)
          .toString()
      : color(theme.colors[type] || type)
          .alpha(0.1)
          .toString();
  }
  return isHovered
    ? color(theme.colors[type] || type)
        .darken(0.1)
        .toString()
    : theme.colors[type] || type;
};

const Touchable = styled(Box)(
  ({ theme, size, isHovered, outlined, rounded, light, type }) => ({
    position: "relative",
    flexDirection: "row",
    width: "auto",
    height: size,
    paddingHorizontal: size / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: getBackground({
      type,
      theme,
      outlined,
      isHovered,
      light
    }),
    borderWidth: outlined ? 3 : 0,
    borderColor: theme.colors[type] || type,
    borderRadius: rounded ? size : theme.globals.roundness,
    web: {
      cursor: "pointer"
    }
  })
);

const Label = styled.Text(
  ({ type, theme, textColor, outlined, light, size }) => ({
    fontSize: size / 3,
    color: textColor,
    textAlign: "center"
  })
);

const LoadingWrap = styled.View({
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  alignItems: "center",
  justifyContent: "center"
});

export default function Button({
  children,
  size = 44,
  type = "primary",
  activeOpacity = 0.9,
  outlined = false,
  rounded = false,
  light = false,
  color,
  labelProps = {},
  ripple = false,
  loading = false,
  disabled = false,
  progress,
  renderLeft = null,
  renderRight = null,
  ...rest
}) {
  const theme = useTheme();
  const textColor = color
    ? color
    : outlined || light
    ? theme.colors[type] || type
    : isDark(theme.colors[type] || type)
    ? "#FFF"
    : "#000";
  return (
    <Hoverable>
      {isHovered => (
        <Touchable
          as={ripple ? Ripple : TouchableOpacity}
          isHovered={isHovered}
          activeOpacity={activeOpacity}
          size={size}
          outlined={outlined ? 1 : 0}
          rounded={rounded ? 1 : 0}
          light={light ? 1 : 0}
          type={type}
          rippleColor={ripple ? type : undefined}
          disabled={loading ? true : disabled}
          {...rest}
        >
          {loading || progress ? (
            <LoadingWrap pointerEvents="none">
              <Progress
                trackColor="transparent"
                circleColor={textColor}
                size={size / 2}
                circleWidth={2}
                value={progress}
                loading={loading}
              />
            </LoadingWrap>
          ) : null}
          {renderLeft}
          {typeof children === "string" ? (
            <Label
              textColor={
                loading === true || progress < 100 ? "transparent" : textColor
              }
              outlined={outlined ? 1 : 0}
              light={light ? 1 : 0}
              size={size}
              type={type}
              pointerEvents="none"
              {...labelProps}
            >
              {children}
            </Label>
          ) : (
            children
          )}

          {renderRight}
        </Touchable>
      )}
    </Hoverable>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  size: PropTypes.number,
  type: PropTypes.string,
  color: PropTypes.string,
  labelStyle: PropTypes.object,
  labelProps: PropTypes.object,
  outlined: PropTypes.bool,
  rounded: PropTypes.bool,
  light: PropTypes.bool,
  ripple: PropTypes.bool,
  loading: PropTypes.bool,
  progress: PropTypes.number
};