import { ReactNode, useMemo } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  View,
  Text,
} from "react-native";

interface ButtonProps {
  onPress?: () => void;
  children?: ReactNode;
  title?: string;
  type?: "primary" | "secondary" | "danger" | "tertiary" | "disabled";
  variant?: "solid" | "outline";
  disabled?: boolean;
  processing?: boolean;
  style?: StyleProp<ViewStyle>;
  processingColor?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// a custom reusable button
export default function Button({
  onPress,
  children,
  title,
  variant = "solid",
  type = "primary",
  disabled = false,
  processing = false,
  processingColor = "#fff",
  leftIcon,
  rightIcon,
  style,
}: ButtonProps) {
  const { currentTextStyle, currentBtnStyle } = useMemo(() => {
    if (type === "danger" && variant === "outline") {
      return {
        currentTextStyle: styles.text_danger,
        currentBtnStyle: styles.outline_danger,
      };
    }

    if (type === "danger" && variant === "solid") {
      return {
        currentTextStyle: styles.text_white,
        currentBtnStyle: styles.solid_danger,
      };
    }

    if (type === "primary" && variant === "outline") {
      return {
        currentTextStyle: styles.text_primary,
        currentBtnStyle: styles.outline_primary,
      };
    }

    if (type === "secondary" && variant === "outline") {
      return {
        currentTextStyle: styles.text_primary,
        currentBtnStyle: styles.outline_secondary,
      };
    }
    if (type === "secondary" && variant === "solid") {
      return {
        currentTextStyle: styles.text_secondary,
        currentBtnStyle: styles.solid_secondary,
      };
    }
    if (type === "tertiary" && variant === "solid") {
      return {
        currentTextStyle: styles.text_white,
        currentBtnStyle: styles.solid_tertiary,
      };
    }
    if (type === "disabled" && variant === "solid") {
      return {
        currentTextStyle: styles.text_white,
        currentBtnStyle: styles.solid_disabled,
      };
    }

    return {
      currentTextStyle: styles.text_white,
      currentBtnStyle: styles.solid_primary,
    };
  }, [variant, type]);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.btn,
        currentBtnStyle,
        style,
        disabled && variant === "solid" ? styles.inactive : null,
      ]}
      onPress={onPress}
    >
      {(children && children) || (
        <>
          {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}
          <Text style={[styles.text, currentTextStyle]}>{title}</Text>
          {rightIcon && <View style={{ marginLeft: 8 }}>{rightIcon}</View>}
          {}
          {processing && (
            <ActivityIndicator
              size="large"
              color={processingColor}
              style={{ position: "absolute", zIndex: 1 }}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 24,
  },

  text_white: { color: "#fff" },
  text_primary: { color: "#2F50C1" },
  text_danger: { color: "red" },
  text_secondary: { color: "#2F50C1" },

  btn: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 48,
    marginBottom: 20,
  },

  solid_primary: {
    backgroundColor: "#2F50C1",
  },
  solid_secondary: {
    backgroundColor: "#fff",
  },

  solid_danger: {
    backgroundColor: "red",
  },
  solid_tertiary: {
    backgroundColor: "#25D366",
  },
  solid_disabled: {
    backgroundColor: "#6E91EC",
  },
  text_solid_disabled: {
    backgroundColor: "#fff",
  },

  outline_primary: {
    borderWidth: 1,
    borderColor: "#2F50C1",
  },
  outline_tertiary: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "transparent",
  },

  outline_danger: {
    borderWidth: 1,
    borderColor: "red",
  },

  outline_secondary: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#008AA7",
  },

  active: {
    backgroundColor: "#2F50C1",
  },
  inactive: {
    backgroundColor: "#EAE7F2",
  },
  inactiveDisabled: {
    backgroundColor: "#EAE7F2",
  },
});
