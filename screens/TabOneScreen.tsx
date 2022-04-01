import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { getRootViewModel } from "../components/Screens/VmManager";
import { Text, View } from "../components/Themed";
import theme from "../themes";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const vm = getRootViewModel((vm) => vm.auth);
  console.log(
    `TCL ~ [TabOneScreen.tsx] ~ line ~ 13 ~ vm`,
    vm.auth?.accessToken
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Spoqa-Han-Sans-Neo",
    color: theme.colors.primary.main,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
