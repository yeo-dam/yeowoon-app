import * as React from "react";
import { useEffect } from "react";
import MapView, {
  MapViewProps,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import styled from "styled-components/native";
import { observer } from "mobx-react";
import MapViewModel from "components/Screens/MyPage/Map/Map.vm";
import { windowWidth, windowHeight } from "constants/Layout";
import MapListModel from "~domain/model/Local/MapListModel";

type Props = {
  places?: MapListModel[];
  loadList: () => void;
  latitude?: number;
  longitude?: number;
} & MapViewProps;

const GoogleMap = ({
  places,
  latitude = 37.5326,
  longitude = 127.024612,
  region,
  loadList,
  onRegionChange,
}: Props) => {
  useEffect(() => {
    async function loadPlaces() {
      // await loadList();
    }
    loadPlaces();
  }, []);

  return (
    <Wrapper>
      <StyledMapView
        region={region}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={onRegionChange}
      >
        {/* FIXME: 주석해제 필요  */}
        {places &&
          places.map((item, inx) => {
            return (
              <Marker
                key={inx}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={item.title}
                description={item.description}
              />
            );
          })}
      </StyledMapView>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const StyledMapView = styled(MapView)`
  width: ${windowWidth + "px"};
  height: ${windowHeight + "px"};
`;

export default observer(GoogleMap);
