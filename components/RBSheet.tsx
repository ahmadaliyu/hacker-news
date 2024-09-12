import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";

const BottomSheet = ({
  refRBSheet,
  children,
  onOpen,
  onClose,
  height = 300,
  otherStyles,
  closeOnPressMask = true,
}: {
  refRBSheet: any;
  children?: any;
  height?: any;
  onOpen?: () => void;
  onClose?: () => void;
  otherStyles?: any;
  closeOnPressMask?: boolean;
}) => {
  const theme = useTheme();
  return (
    <RBSheet
      draggable={true}
      closeOnPressMask={closeOnPressMask}
      ref={refRBSheet}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(15, 14, 45, 0.6)",
        },
        container: {
          ...styles.rb_container,
          height,
          ...otherStyles,
          backgroundColor: theme.colors.onPrimary,
        },
        draggableIcon: {
          backgroundColor: theme.colors.inverseOnSurface,
        },
      }}
      onOpen={onOpen}
      onClose={onClose}
    >
      {children}
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "800",
    fontSize: 16,
    lineHeight: 24,
    color: "#57575B",
    marginBottom: 10,
  },
  sheet_content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sheet_title: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#000",
  },
  sheet_text: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    color: "#000",
  },
  rb_container: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#fff",
    height: 300,
    paddingHorizontal: 24,
  },
});

export default BottomSheet;
