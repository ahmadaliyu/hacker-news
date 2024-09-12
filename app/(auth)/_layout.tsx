import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          animation: "fade_from_bottom",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          animation: "fade_from_bottom",
        }}
      />
    </Stack>
  );
}
