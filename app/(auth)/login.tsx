import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import Header from "@/components/Header";
import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { useTheme } from "react-native-paper";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

export default function LoginScreen() {
  //useful to disable button when there is no input
  const [inputValues, setInputValue] = useState({
    usrOrEmail: "",
    password: "",
  });
  const [isLoading, setIsLoadig] = useState(false);

  // navigate back to main screen
  const toSignup = () => {
    router.navigate("/signup");
  };

  // function to login the user
  const handleLogin = async () => {
    const db = await SQLite.openDatabaseAsync("testDB");

    console.log(db, "the database");

    try {
      setIsLoadig(true);
      // select everything from the test database
      const allRows = await db.getAllAsync("SELECT * FROM test");
      console.log(allRows, 9999888);

      const usernameExists = allRows.some(
        //@ts-ignore
        (item) => item.value === inputValues.usrOrEmail.trim()
      );

      if (usernameExists) {
        setIsLoadig(false);
        Alert.alert("Login success!");
        router.replace("/(tabs)");
      } else {
        Alert.alert("Username and password incorrect!");
        setIsLoadig(false);
        return;
      }
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
      <Header chevron={false} title="Login" />
      <View style={styles.con}>
        <Text style={styles.loginText}>Login</Text>
        <Text style={{ ...styles.text2, color: theme.colors.tertiary }}>
          Please enter your username and password in order to Login
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
          placeholder="Password"
          onChange={(text) => {
            setInputValue({
              ...inputValues,
              password: text,
            });
          }}
          rightIcon={<MaterialIcons name="remove-red-eye" size={24} />}
        />
      </View>
      <Text style={styles.accText}>
        Don't have a account?{" "}
        <Text
          onPress={toSignup}
          style={{ ...styles.txt, color: theme.colors.primary }}
        >
          Signup
        </Text>
      </Text>
      <Button
        onPress={() => handleLogin()}
        disabled={!inputValues.usrOrEmail || !inputValues.password}
        title="Login"
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
  accText: { textAlign: "center", marginVertical: 8 },

  txt: { fontFamily: "mSB" },
});
