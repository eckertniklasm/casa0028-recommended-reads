import { useState } from 'react';
import {Map, Source, Layer, Popup} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { plaqueData } from '../data/open-plaques-london-2023-11-10-filtered';

function MapDisplay(props) {

  const handleMapClick = (event) => {
    const features = event.features;
    if (features.length) {
        const clickedFeature = features[0];
        props.setSelectedPlaque(clickedFeature);
    }
  }

  const plaqueLayerStyle = {
      id: 'plaques-layer',
      type: 'circle',
      source: 'plaques-data',
      paint: {
          'circle-radius': 6,
          'circle-color': '#007cbf',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
      },
  }
  return (
    <Map
      initialViewState={{
        longitude: props.longitude || -122.4,
        latitude: props.latitude || 37.8,
        zoom: props.zoom || 10
      }}
      style={{width: '100%', height: '100%'}}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      interactiveLayerIds={['plaques-layer']}
      onClick={handleMapClick}
      >
      <Source id="plaques-data" type="geojson" data={plaqueData}>
      <Layer {...plaqueLayerStyle} />
      </Source>

      {props.selectedPlaque && (
        <Popup
            anchor="bottom"
            longitude={props.selectedPlaque.geometry.coordinates[0]}
            latitude={props.selectedPlaque.geometry.coordinates[1]}
            onClose={() => props.setSelectedPlaque(null)}
        >
            <div style={{borderRadius: '16px', padding: '4px', backgroundColor: '#ffffff', paddingTop: '28px'}}>
                
                <div style={{border: '4px solid #007cbf', padding: '12px', borderRadius: '12px'}}>
                    <h2 className="text-xl font-semibold mb-2 bg-white px-2 py-1 rounded" style={{marginTop: '0px', display: 'inline-block', position: 'relative', zIndex: '10'}}>{props.selectedPlaque.properties.lead_subject_name}</h2>
                    <p className="text-xs text-gray-600 mb-2">{props.selectedPlaque.properties.address}</p>
                    <p className="text-xs text-blue-500 my-2"><a href={`https://openplaques.org/plaques/${props.selectedPlaque.properties.id1}`}>OpenPlaques</a></p>
                    <p className="text-xs text-blue-500 my-2"><a href={props.selectedPlaque.properties.lead_subject_wikipedia}>Wikipedia</a></p>
                    </div>
                <div className="mt-4 flex" style={{borderRadius: '12px'}}>
                    <button 
                        className={"w-full rounded-l-sm border border-gray-200 px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:pointer-events-auto disabled:opacity-50"}
                        onClick={() => props.setIsModalOpen(true)}
                    >Recommended Reading</button>
                
                </div>
            </div>
    </Popup>
)}
    </Map>
  );
}

export default MapDisplay;