import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const tile = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);

const mapParams = {
  center: [49.2480, -123.1410], // Vancouver
  zoom: 12,
  maxZoom: 12,
  minZoom: 12,
  zoomControl: false,
  scrollwheel: false,
  zoomSnap: 0.75,
  maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
  closePopupOnClick: false,
};

const LeafletMapView = ({ geojson, handleLocationClick, style, mode, workLocation }) => {
  const mapRef = useRef(null);
  console.log(workLocation);
  const GeoJson = L.geoJson(geojson, {
    onEachFeature: (feature, layer) => {
      layer.on('mouseover', () => {
        let location = feature.properties.name;
        layer.bindPopup(location + " : " +feature.properties[mode] + " mins").openPopup();
      });
      layer.on('click', () => {
        handleLocationClick(feature.properties.name);
      });
    },
    style,
  });

  const initMap = (elementId) => {
    mapRef.current = L.map(elementId, mapParams);
    tile.addTo(mapRef.current);
    GeoJson.addTo(mapRef.current);
  };

  useEffect(() => {
    initMap('map');
  }, []);

  useEffect(() => {
    if (mapRef !== undefined && mapRef !== null
          && mapRef.current !== undefined && mapRef.current !== null) {
      mapRef.current.remove();
    }
    initMap('map');
  }, [geojson, style]);

  return (<div id="map" />);
};

export default LeafletMapView;

LeafletMapView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  geojson: PropTypes.objectOf(PropTypes.any).isRequired,
  handleLocationClick: PropTypes.func.isRequired,
  style: PropTypes.func.isRequired,
};
