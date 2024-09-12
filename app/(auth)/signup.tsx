import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import Header from "@/components/Header";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Alert } from "react-native";
import { useTheme } from "react-native-paper";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

export default function SignupScreen() {
  const [isLoading, setIsLoadig] = useState(false);

  //useful to disable button when there is no input
  const [inputValues, setInputValue] = useState({
    usrOrEmail: "",
    password: "",
    confirmPassword: "",
  });

  // navigate back to main screen
  const handleCancel = () => {
    router.back();
  };

  // function to login the user
  const handleSignup = async () => {
    const db = await SQLite.openDatabaseAsync("testDB");

    console.log(db);

    if (inputValues.password !== inputValues.confirmPassword) {
      Alert.alert("Paswword do not match");
      return;
    }

    try {
      setIsLoadig(true);
      await db.execAsync(`
CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
            `);
      await db.runAsync(
        "INSERT INTO test (value, intValue) VALUES (?, ?)",
        inputValues.usrOrEmail,
        100
      );
      let result = await db.runAsync(
        "INSERT INTO test (value, intValue) VALUES (?, ?)",
        inputValues.password,
        200
      );
      router.navigate("/login");
      setIsLoadig(false);
      console.log(result.lastInsertRowId, result.changes);
    } catch (error) {
      console.log(error);
      setIsLoadig(false);
    }
  };
  const theme = useTheme();
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.onPrimary }}
    >
      <Header title="Signup" />
      <View style={styles.con}>
        <Text style={styles.loginText}>Signup</Text>
        <Text style={{ ...styles.text2, color: theme.colors.tertiary }}>
          Please enter your Username and password in order to register
        </Text>

        <CustomInput
          outerContainerStyle={styles.inputCon}
          placeholder="Username / Email"
          onChange={(text) => {
            setInputValue({
              ...inputValues,
              usrOrEmail: text,
            });
          }}
        />
        <CustomInput
          outerContainerStyle={styles.inputCon}
          password
          placeholder="Password"
          onChange={(text) => {
            setInputValue({
              ...inputValues,
              password: text,
            });
          }}
          rightIcon={<MaterialIcons name="remove-red-eye" size={24} />}
        />
        <CustomInput
          outerContainerStyle={styles.inputCon}
          password
          placeholder="Confirm Password"
          onChange={(text) => {
            setInputValue({
              ...inputValues,
              confirmPassword: text,
            });
          }}
          rightIcon={<MaterialIcons name="remove-red-eye" size={24} />}
        />
      </View>
      <Button
        onPress={handleSignup}
        disabled={
          !inputValues.usrOrEmail ||
          !inputValues.password ||
          !inputValues.confirmPassword
        }
        title="Signup"
        processing={isLoading}
        processingColor={theme.colors.onPrimary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    padding: 24,
  },
  iconCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 17,
  },
  text2: {
    lineHeight: 24,
    marginTop: 8,
  },
  con: { flex: 1 },
  loginText: {
    fontFamily: "interBold",
    fontSize: 34,
  },
  inputCon: {
    marginVertical: 16,
  },
});
