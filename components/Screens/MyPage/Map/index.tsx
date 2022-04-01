import * as React from "react";
import { useEffect, useState } from "react";

import ContentLayout from "components/Layout/ContentLayout";
import ErrorMsg from "components/Shared/ErrorMsg";
import Loadable from "components/Shared/Loadable";
import MapViewModel from "./Map.vm";
import GoogleMap from "components/Local/GoogleMap";
import * as Location from "expo-location";
import { Region } from "react-native-maps";
import { View } from "react-native";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import { getRootViewModel } from "~components/Screens/VmManager";
import { RootTabScreenProps } from "types";
import useIsMounted from "hooks/useIsMounted";

const Map = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.MAP>) => {
  const vm = getRootViewModel<MapViewModel>((viewModel) => viewModel.tab.Map);
  const [location, setLocation] = useState<Region>();
  const isMounted = useIsMounted();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        vm.setError(true);
        return;
      }

      let locationInfo = await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: locationInfo.coords.latitude,
        longitude: locationInfo.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, [isMounted]);

  if (vm.isLoading) {
    return <Loadable />;
  }

  if (vm.isError) {
    return <ErrorMsg />;
  }

  return (
    <ContentLayout title="Tab Three">
      <View>
        <GoogleMap
          vm={vm}
          region={location}
          latitude={location?.latitude}
          longitude={location?.longitude}
          onRegionChange={(region) => {
            // setLocation(region);
          }}
        />
      </View>
    </ContentLayout>
  );
};

export default Map;
