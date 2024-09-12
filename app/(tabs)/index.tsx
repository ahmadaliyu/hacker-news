import React, { memo, useCallback, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useGetstoryQuery } from "@/service/appApi";
import Header from "@/components/Header";
import { router } from "expo-router";

const ITEMS_PER_PAGE = 10;

const ListItem = memo(
  ({ item, onPress }: { item: string; onPress: () => void }) => {
    const theme = useTheme();

    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: theme.colors.primary }]}
        onPress={onPress}
      >
        <Text style={[styles.text, { color: theme.colors.onPrimary }]}>
          {item}
        </Text>
        <MaterialIcons
          name="chevron-right"
          color={theme.colors.onPrimary}
          size={30}
        />
      </TouchableOpacity>
    );
  }
);

export default function HomeScreen() {
  const { data, isLoading, isFetching } = useGetstoryQuery();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const theme = useTheme();

  // Function to refresh data
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1); // Reset page on refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Pagination logic using useMemo
  const itemData = useMemo(() => {
    if (!data) return [];
    const endIndex = page * ITEMS_PER_PAGE;
    return data.slice(0, endIndex); // Return only the items up to the current page
  }, [data, page]);

  // Load more items when reaching the end of the list
  const handleLoadMore = () => {
    if (!isFetching && itemData.length < data.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Small loading indicator at the bottom
  const renderFooter = () => {
    if (!isFetching) return null; // Only show the loader when fetching
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color={"green"} />
      </View>
    );
  };

  return (
    <View style={{ ...styles.con, backgroundColor: theme.colors.onPrimary }}>
      <Header
        left={
          <TouchableOpacity>
            <Avatar.Text
              size={50}
              label={"TS"}
              style={[{ backgroundColor: theme.colors.primary }]}
              labelStyle={{
                fontSize: 16,
                textTransform: "uppercase",
                color: theme.colors.onPrimary,
              }}
            />
          </TouchableOpacity>
        }
      />
      <Text>Hello there!</Text>
      <Text style={styles.news}>Latest news</Text>

      {isLoading && !refreshing && (
        <ActivityIndicator color={theme.colors.primary} />
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={itemData}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onPress={() =>
              router.push({
                pathname: "/story-detail",
                params: { storyId: item },
              })
            }
          />
        )}
        keyExtractor={(item) => item}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter} // Add the footer loader
      />
    </View>
  );
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    padding: 24,
  },
  container: {
    marginVertical: 8,
    padding: 24,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  news: {
    fontSize: 16,
    marginVertical: 16,
    fontFamily: "mB",
  },
});
