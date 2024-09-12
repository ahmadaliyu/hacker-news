import Header from "@/components/Header";
import ScrollContainer from "@/components/ScrollContainer";
import { useGetstoryByIdQuery } from "@/service/appApi";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "react-native-paper";

export default function StoryDetail() {
  const item = useLocalSearchParams();

  const theme = useTheme();

  console.log(item);

  const { data, isLoading } = useGetstoryByIdQuery(item.storyId.toString());

  console.log(data, 888);

  if (isLoading) {
    return (
      <View
        style={{ ...styles.indicator, backgroundColor: theme.colors.onPrimary }}
      >
        <ActivityIndicator size={"large"} color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollContainer
      style={styles.container}
      header={<Header title="Details" />}
    >
      <Text style={styles.sum}>Summary</Text>
      <View style={styles.header}>
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.meta}>
          by {data?.by} | Score: {data?.score} | {data?.descendants} Comments
        </Text>
        <Text style={styles.timestamp}>
          {new Date((data?.time as any) * 1000).toLocaleString()}
        </Text>
        <Text style={styles.text}>Type: {data?.type}</Text>
      </View>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginBottom: 16,
    marginVertical: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
  meta: {
    fontSize: 14,
    color: "gray",
    marginVertical: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
    marginVertical: 4,
  },
  content: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },

  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sum: {
    fontSize: 20,
    fontFamily: "mR",
    marginVertical: 16,
  },
});
