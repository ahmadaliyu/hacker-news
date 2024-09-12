import React, { RefCallback, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TextInputProps,
  StyleProp,
  ViewStyle,
  Text,
  TouchableOpacity,
} from "react-native";

//@ts-expect-error
interface CustomInputProps extends TextInputProps {
  name?: string;
  label?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  error?: any;
  password?: boolean;
  international?: boolean;
  transformFn?: (text: string) => string;
  inputContainerStyle?: StyleProp<ViewStyle>;
  outerContainerStyle?: StyleProp<ViewStyle>;
  inputRef?: RefCallback<any>;
  underlined?: boolean;
  placeholderTextColor?: string;
  theme?: "light" | "dark" | undefined;
  onChange: (text: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  leftIcon,
  rightIcon,
  error,
  password = false,
  international = false,
  transformFn,
  inputRef,
  underlined,
  placeholderTextColor,
  onChange,
  ...rest
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(password);
  const [inputValue, setInputValue] = useState<string>(rest.defaultValue || "");

  const handleChangeText = (text: string) => {
    // Update the internal state to reflect the current input value
    setInputValue(text);
    // Call the onChange prop to pass the value to the parent component
    onChange(text);
  };

  return (
    <View
      style={[
        label && styles.container,
        rest.outerContainerStyle,
        error && styles.containerError,
      ]}
    >
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          rest.inputContainerStyle,
          underlined && styles.underline,
        ]}
      >
        {leftIcon && (
          <View
            style={{
              ...styles.iconContainer,
              alignItems: "center",
            }}
          >
            {leftIcon}
          </View>
        )}

        <TextInput
          {...rest}
          ref={inputRef}
          style={[styles.input, rest.style, error && styles.inputError]}
          placeholderTextColor={placeholderTextColor || "#9CA3AF"}
          onChangeText={handleChangeText}
          value={inputValue} // Input value from the state
          secureTextEntry={secureTextEntry}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={() => setSecureTextEntry((prev) => !prev)}
            style={{
              ...styles.iconContainer,
              alignItems: "center",
              justifyContent: "center",
              right: 24,
            }}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  containerError: {
    borderColor: "red",
  },
  label: {
    marginBottom: 5,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
    color: "#030309",
    fontFamily: "gMedium",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 0,
    marginBottom: 5,
    borderColor: "#F5F5F5",
    paddingVertical: 2,
    alignItems: "center",
    color: "#57575B",
    height: 45,
  },
  iconContainer: {
    paddingHorizontal: 5,
  },
  input: {
    paddingVertical: 8,
    fontSize: 16,
    width: "90%",
    height: "100%",
    color: "#010E0E",
    fontWeight: "400",
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    marginTop: 5,
    color: "red",
  },
  underline: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
});

export default CustomInput;
