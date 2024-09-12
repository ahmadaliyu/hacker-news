import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import Header from "@/components/Header";
import ScrollContainer from "@/components/ScrollContainer";
import Text from "@/components/Text";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, Alert, View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";

export default function ProfileScreen() {
  const theme = useTheme();

  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, slideAnim]);

  const onLogout = () =>
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => router.replace("/(auth)/login"),
        style: "destructive",
      },
    ]);

  return (
    <ScrollContainer
      header={<Header title="My profile" chevron={false} />}
      footer={
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      }
      style={{ ...styles.con }}
    >
      {/* Profile Avatar */}
      <Avatar.Text
        size={80}
        label={"TS"}
        style={[{ backgroundColor: theme.colors.primary, marginBottom: 16 }]}
        labelStyle={{
          fontSize: 16,
          textTransform: "uppercase",
          color: theme.colors.onPrimary,
        }}
      />

      {/* Name (Animated Text) */}
      <Animated.View
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      >
        <Text style={styles.title}>Ahmad Aliyu</Text>
      </Animated.View>

      {/* Description (Animated Text) */}
      <Animated.View
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      >
        <Text style={styles.description}>
          Hello! I'm Ahmad Aliyu, a passionate software developer with
          experience in mobile and web development.
        </Text>
      </Animated.View>

      {/* Section - Skills */}
      <Animated.View
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.sectionContent}>- React Native</Text>
          <Text style={styles.sectionContent}>- JavaScript</Text>
          <Text style={styles.sectionContent}>- Web Development</Text>
          <Text style={styles.sectionContent}>- Mobile Development</Text>
        </View>
      </Animated.View>

      {/* Section - Contact Information */}
      <Animated.View
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <Text style={styles.sectionContent}>
            Email: aliyuahmad1996@gmail.com
          </Text>
          <Text style={styles.sectionContent}>
            LinkedIn: linkedin.com/in/aliyu-ahmad-b13345178/
          </Text>
          <Text style={styles.sectionContent}>Phone: 08132943547</Text>
        </View>
      </Animated.View>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  con: {
    padding: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
    marginVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  section: {
    width: "100%",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 16,
    marginBottom: 3,
  },
});
