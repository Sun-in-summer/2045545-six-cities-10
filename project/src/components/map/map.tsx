import { Offers, Offer, City } from '../../types/offer';
import {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import {LayerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';

type MapProps = {
  city: City,
  offers: Offers,
  selectedOffer: Offer | undefined,
  width: number,
}

function Map({city, offers, selectedOffer, width}:MapProps) : JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city.location);


  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });

  useEffect(()=> {
    if (map) {
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        });
    }
  }, [map, city.location]);

  useEffect(() => {
    let layer: LayerGroup;
    if (map) {
      layer = new LayerGroup().addTo(map);
      offers.forEach((offer) => {
        leaflet.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        },
        {
          icon: (selectedOffer !== undefined && offer.id === selectedOffer.id)
            ? currentCustomIcon
            : defaultCustomIcon,
        })
          .addTo(layer);
      });

    }

    return () => {
      layer?.clearLayers();
    };
  }, [map, offers, defaultCustomIcon, currentCustomIcon, selectedOffer]);


  return (
    <div
      style={{height: '100%', margin: '0 auto', width: `${width}%`, maxWidth:'1144px'}}
      ref = {mapRef}
    >
    </div>);

}


export default Map;


