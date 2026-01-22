import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

function MapDisplay(props) {
  return (
    <Map
      initialViewState={{
        longitude: props.longitude || -122.4,
        latitude: props.latitude || 37.8,
        zoom: props.zoom || 10
      }}
      style={{width: 600, height: 400}}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    />
  );
}

export default MapDisplay;