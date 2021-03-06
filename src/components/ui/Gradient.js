import React, { Component } from "react";
import Svg, { Defs, Stop, Rect, LinearGradient } from "swgs";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";

import Box from "../primitives/Box";
import { getProp } from "../../helper";
import { useTheme } from "../../style/Theme";

const getID = () => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(2, 10);
};

const Comp = props => {
  const { children, style, ...rest } = props;
  const theme = useTheme();
  const { gradient } = defaultStyle;
  var id = getID();
  const colors = getProp(props, theme, "colors", "gradient");
  return (
    <Box style={StyleSheet.flatten([gradient, style])} {...rest}>
      <Svg height="100%" width="100%">
        <Defs>
          <LinearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            {colors && colors.length > 0
              ? colors.map((color, index) => (
                  <Stop
                    key={`color-${color}-${index}`}
                    offset={`${(index / (colors.length - 1)) * 100}%`}
                    style={{ stopColor: color, stopOpacity: "1" }}
                  />
                ))
              : null}
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
      {children}
    </Box>
  );
};

const defaultStyle = StyleSheet.create({
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 0,
    overflow: "hidden"
  }
});

Comp.propTypes = {
  colors: PropTypes.array,
  style: PropTypes.object
};

export default Comp;
