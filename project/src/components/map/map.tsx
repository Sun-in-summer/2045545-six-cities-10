import { Offers, City, Offer } from '../../types/offer';
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
  const map = useMap(mapRef, city);


  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

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
    <section className="cities__map"
      style={{height: '100%', margin: '0 auto', width: `${width}%`, maxWidth:'1144px'}}
      ref = {mapRef}
    >

    </section>);

}


export default Map;


