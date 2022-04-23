import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import ModalProvider from "navigation/modalContext";
import React, { useEffect, useState } from "react";
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
  const [accessToken, setAccessToken] = useState<string>("");

  // 1) 여기서 유저 엑세스 토큰이 발급되어 있는지 따져주고 있으면 바로 처리
  const getTocken = async () => {
    const loginToken = await AsyncStorage.getItem("loginToken");
    if (loginToken) {
      // AsyncStorage.clear();
      setAccessToken(loginToken);
    }
  };

  useEffect(() => {
    getTocken();
  }, [accessToken]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ViewModelProvider accessToken={accessToken}>
        <ModalProvider>
          <ThemeProvider theme={theme}>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} setToken={setAccessToken} />
              <StatusBar />
            </SafeAreaProvider>
          </ThemeProvider>
        </ModalProvider>
      </ViewModelProvider>
    );
  }
}
