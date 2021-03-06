import React, { useState, Fragment, useEffect } from "react";
import { Platform, StyleSheet, SafeAreaView } from "react-native";
import { useTransition, animated } from "react-spring/native";

import styled from "../../style/styled";
import Icon from "../ui/Icon";
import { useTheme } from "../../style/Theme";
import { getColorMode, isIphoneX } from "../../helper";

const Container = styled.View(({ from, gap }) => ({
  position: Platform.OS === "web" ? "fixed" : "absolute",
  left: 0,
  bottom: from === "bottom" ? 0 : "auto",
  top: from === "top" ? 0 : "auto",
  width: "100%",
  zIndex: 500,
  paddingHorizontal: gap,
  paddingVertical: isIphoneX() ? gap / 2 + 25 : gap / 2
}));

const Message = animated(
  styled.View(({ theme, type, gap, maxWidth }) => ({
    flexBasis: "100%",
    alignItems: "center",
    backgroundColor: type || "surface",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: gap / 2,
    width: "100%",
    maxWidth: maxWidth,
    alignSelf: "center",
    borderRadius: theme.globals.roundness
  }))
);

const Text = styled.Text(({ color }) => ({
  maxWidth: 400,
  width: "100%",
  padding: 20,
  color: color
}));

let id = 0;

const Comp = ({
  alert,
  timeout = 2000,
  from = "bottom",
  gap = 15,
  maxWidth = 700,
  ...rest
}) => {
  const theme = useTheme();
  const [items, setItems] = useState([]);

  const transitions = useTransition(items, items => items.key, {
    from: { opacity: 0, top: from === "bottom" ? 30 : -30 },
    enter: { opacity: 1, top: 0 },
    leave: { opacity: 0, top: from === "bottom" ? 30 : -30 },
    onRest: item =>
      setTimeout(() => {
        setItems(state => state.filter(i => i.key !== item.key));
      }, timeout)
  });

  useEffect(() => {
    if (alert) {
      if (from === "bottom") {
        setItems(state => [
          ...state,
          { key: id++, message: alert.message, type: alert.type }
        ]);
      } else {
        setItems(state => [
          { key: id++, message: alert.message, type: alert.type },
          ...state
        ]);
      }
    }
  }, [alert]);

  return (
    <Container from={from} gap={gap} pointerEvents="box-none" {...rest}>
      {from === "top" ? <SafeAreaView collapsable={false} /> : null}
      {transitions.map(({ item, props, key }) => (
        <Message
          key={key}
          style={props}
          type={item.type}
          from={from}
          gap={gap}
          maxWidth={maxWidth}
          shadow={3}
        >
          <Text
            color={
              getColorMode(theme.colors[item.type || "surface"]) === "light"
                ? "#000"
                : "#FFF"
            }
          >
            {item.message}
          </Text>
          <Icon
            style={{
              position: "absolute",
              top: 17,
              right: 15
            }}
            size={20}
            color={
              getColorMode(theme.colors[item.type || "surface"]) === "light"
                ? "#000"
                : "#FFF"
            }
            onPress={e => {
              e.stopPropagation();
              setItems(state => state.filter(i => i.key !== item.key));
            }}
          />
        </Message>
      ))}
      {/* {from === "bottom" ? <SafeAreaView collapsable={false} /> : null} */}
    </Container>
  );
};

export default Comp;
