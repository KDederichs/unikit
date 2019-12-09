import React, { Children, useState } from "react";

import styled from "../styled";
import Button from "../Button";
import Box from "../Box";

const FormWrap = styled(Box)({
  width: "100%"
});

const getDefaultValue = ({ child: { props } }) => {
  let value = undefined;
  if (props.type === "text") {
    value = "";
  }
  if (props.type === "number" || props.type === "range") {
    value = 0;
  }
  if (props.type === "switch" || props.type === "checkbox") {
    value = false;
  }
  if (props.defaultValue) value = props.defaultValue;
  return value;
};

const getDefaultState = (children, state) => {
  Children.map(children, (child, i) => {
    if (child.key) {
      state[child.key] = getDefaultValue({ child });
    }
    if (child.props && child.props.children)
      getDefaultState(child.props.children, state);
  });
  return state;
};

const renderChildren = (children, doc, setDoc) => {
  return Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      key: child.key || `child-${index}`,
      value: doc[child.key],
      onChange: value => {
        if (child.key) {
          console.log({ value, key: child.key });
          setDoc({ ...doc, [child.key]: value });
        }
      },
      children:
        child.props &&
        child.props.children &&
        typeof child.props.children !== "string"
          ? renderChildren(child.props.children, doc, setDoc)
          : child.props.children
    });
  });
};

export default function Form({
  children,
  schema,
  onSubmit,
  button = true,
  buttonLabel = "Submit",
  buttonProps = {},
  ...rest
}) {
  const [doc, setDoc] = useState(() => {
    return getDefaultState(children, {});
  });
  return (
    <FormWrap {...rest}>
      {renderChildren(children, doc, setDoc)}
      {button ? (
        <Button
          onPress={() => (onSubmit ? onSubmit(doc) : null)}
          {...buttonProps}
        >
          {buttonLabel}
        </Button>
      ) : null}
    </FormWrap>
  );
}