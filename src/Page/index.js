import React, { Fragment, useState, useRef, useEffect } from "react";
import { ScrollView, SafeAreaView, Platform } from "react-native";

import styled from "../styled";

const Page = styled.View({
  flex: 1
});

export default ({
  bg = "background",
  children,
  hasSafeArea,
  scrollable,
  renderHeader,
  renderFooter,
  scrollViewProps,
  scrollViewComponent,
  onScroll,
  scrollTop,
  scrollAnimated = true,
  ...rest
}) => {
  const [top, setTop] = useState(0);
  const scrollRef = useRef(null);

  const onScrollPage = e => {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    if (onScroll) onScroll(e.nativeEvent.contentOffset);
    setTop(offset);
  };

  useEffect(() => {
    if (scrollRef && scrollRef.current && scrollRef.current.scrollTo) {
      scrollRef.current.scrollTo({
        x: scrollTop,
        y: 0,
        animated: scrollAnimated
      });
    }
  }, [scrollTop]);

  const Scroller = scrollable ? scrollViewComponent || ScrollView : Fragment;
  const ScrollerProps = {
    ...{
      onScroll: onScrollPage,
      scrollEventThrottle: 100,
      showsVerticalScrollIndicator: false
    },
    ...scrollViewProps
  };
  return (
    <Page
      bg={bg}
      as={hasSafeArea ? SafeAreaView : undefined}
      accessibilityRole={Platform.OS === "web" ? "main" : "none"}
      {...rest}
    >
      {renderHeader ? renderHeader(top) : null}
      <Scroller ref={scrollRef} {...(scrollable ? ScrollerProps : {})}>
        {children}
      </Scroller>
      {renderFooter ? renderFooter(top) : null}
    </Page>
  );
};
