import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components";
import ViewModelProvider from "./components/Screens/VmManager";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import theme from "./themes";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [accessToken, setAccessToken] = useState("");

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ViewModelProvider accessToken={accessToken}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </ThemeProvider>
      </ViewModelProvider>
    );
  }
}
