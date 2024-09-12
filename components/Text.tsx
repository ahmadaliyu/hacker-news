import React from "react";
import { Text as RNText, StyleSheet, TextProps } from "react-native";

interface ActiveBaseTextProps extends TextProps {
  children: React.ReactNode;
}

const Text: React.FC<ActiveBaseTextProps> = ({ children, ...props }) => {
  return (
    <RNText style={styles.text} {...props}>
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  text: {
    fontFamily: "mR",
    marginLeft: 5,
  },
});
