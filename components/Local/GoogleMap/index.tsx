import * as React from "react";
import MapView, {
  MapViewProps,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import styled from "styled-components/native";
import { observer } from "mobx-react";
import { windowWidth, windowHeight } from "constants/Layout";
import MapListModel from "~domain/model/Local/MapListModel";

type Props = {
  places?: MapListModel[];
<<<<<<< HEAD
=======
  loadList: () => void;
>>>>>>> f27df783ec7daadbece89a0409c986c3ec780c32
  latitude?: number;
  longitude?: number;
} & MapViewProps;

const GoogleMap = ({
  places,
  latitude = 37.5326,
  longitude = 127.024612,
  region,
  onRegionChange,
}: Props) => {
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
          places.map((item) => {
            return (
              <StyledMarker
                key={item.placeId}
                // image={{ uri: item.image }}
                // image={require("../../../assets/images/Marker.png")}
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

const StyledMarker = styled(Marker)`
  width: 10px;
  height: 10px;
`;

export default observer(GoogleMap);
