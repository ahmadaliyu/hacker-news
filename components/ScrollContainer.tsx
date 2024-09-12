import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ViewStyle,
  ScrollViewProps,
} from "react-native";
import { useTheme } from "react-native-paper";

interface ScrollContainerProps extends ScrollViewProps {
  children: ReactNode;
  contentStyle?: ViewStyle;
  disableScroll?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  bodyStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

export default function ScrollContainer({
  children,
  contentStyle,
  disableScroll = false,
  header,
  footer,
  bodyStyle,
  containerStyle,
  ...rest
}: ScrollContainerProps) {
  const theme = useTheme();
  const Component = disableScroll ? View : ScrollView;

  return (
    <View
      style={[
        { ...styles.wrapper, backgroundColor: theme.colors.onPrimary },
        contentStyle,
      ]}
    >
      {header}
      <Component
        style={[
          { flex: 1, backgroundColor: theme.colors.onPrimary },
          rest?.style,
        ]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { backgroundColor: theme.colors.onPrimary },
          containerStyle,
        ]}
        {...rest}
      >
        <View style={[styles.con, bodyStyle]}>{children}</View>
      </Component>
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 15,
  },
  con: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
