import { useEffect, useState, MutableRefObject } from 'react';
import leaflet from 'leaflet';
import {Map} from 'leaflet';
import {City} from '../../types/offer';


function useMap(mapRef : MutableRefObject<HTMLElement | null>, city : City ): Map | null {

  const {location} = city;
  const {latitude, longitude, zoom } = location;

  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
    }
  }, [mapRef, map, latitude, longitude, zoom]);

  return map;
}

export default useMap;
