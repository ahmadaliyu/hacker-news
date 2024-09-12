import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Text,
  TextStyle,
} from "react-native";
import React, { ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({
  right,
  left,
  otherAction,
  contentStyle,
  title,
  chevron = true,
  ...rest
}: {
  right?: ReactNode;
  left?: ReactNode;
  otherAction?: () => void;
  contentStyle?: ViewStyle;
  title?: string;
  chevron?: boolean;
}) {
  const navigation = useNavigation();

  return (
    <View style={[styles.con, contentStyle && contentStyle]} {...rest}>
      <View style={styles.left}>
        {left ? (
          left
        ) : (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}
          >
            {chevron && <MaterialIcons name="chevron-left" size={30} />}
          </TouchableOpacity>
        )}
        <View style={{ marginLeft: chevron ? "40%" : "45%" }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
              fontFamily: "mSB",
            }}
          >
            {title && title}
          </Text>
        </View>
      </View>
      {right && right}
    </View>
  );
}

const styles = StyleSheet.create({
  con: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    marginBottom: 24,
    marginTop: 24,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  back: {
    marginRight: 15,
  },
});
