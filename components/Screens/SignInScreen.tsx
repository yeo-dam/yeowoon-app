import { useNavigation } from "@react-navigation/native";
import Layout from "constants/Layout";
import * as React from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import GoogleLogin from "~components/Shared/GoogleLogin";
import Typography from "~components/Shared/Typography";

const SplashImagePath = "~assets/images/main.png";

const {
  window: { width: windowWidth, height: windowHeight },
} = Layout;

export default function SignInScreen({
  setToken,
}: {
  setToken: (data: string) => void;
}) {
  return (
    <ImageBackground
      source={require("~assets/images/main.png")}
      resizeMode="cover"
      style={{ flex: 1, width: windowWidth, height: windowHeight + 10 }}
    >
      <InnerWrapper>
        <TitleSection>
          <Title>로그인 화면</Title>
        </TitleSection>
        <LoginUISection>
          <GoogleLogin setToken={setToken} />
        </LoginUISection>
      </InnerWrapper>
    </ImageBackground>
  );
}

const InnerWrapper = styled.View`
  flex: 1;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const TitleSection = styled.View`
  position: absolute;
  top: 23%;
`;

const LoginUISection = styled.View`
  position: absolute;
  top: 77%;
`;

const Title = styled(Typography)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.background.paper}
  font-weight: bold;
`;

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
