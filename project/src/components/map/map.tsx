import {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import {LayerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, NEAR_ITEMS_QUANTITY} from '../../const';
import { useAppSelector } from '../../hooks';
import { getNearByOffersData, getSelectedOfferData } from '../../store/data-process/selector';
import { getSelectedCity } from '../../store/select-city-process/selector';
import {getActiveCardId } from '../../store/data-process/selector';
import useSelectedCityOffers from '../../hooks/useSelectedCityOffers/useSelectedCityOffers';


type MapProps = {
  width?: number,
  isOfferScreen?: boolean,

}

function Map({width, isOfferScreen}:MapProps) : JSX.Element {

  const selectedCity = useAppSelector(getSelectedCity);
  const selectedOffer = useAppSelector(getSelectedOfferData);
  const nearByOffers = useAppSelector(getNearByOffersData);
  const selectedCityOffers = useSelectedCityOffers();
  let activeCardId = useAppSelector(getActiveCardId);

  let offersToShowOnMap = isOfferScreen ? nearByOffers.slice(0, NEAR_ITEMS_QUANTITY) : selectedCityOffers;


  if (isOfferScreen && selectedOffer !== undefined ){
    offersToShowOnMap = offersToShowOnMap.concat(selectedOffer);
  }


  const city = (isOfferScreen && selectedOffer) ? selectedOffer.city : selectedCity;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city.location);


  if (isOfferScreen) {
    activeCardId = selectedOffer?.id;
  }

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
      offersToShowOnMap.forEach((offer) => {
        leaflet.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        },
        {
          icon: (activeCardId !== undefined && offer.id === activeCardId)
            ? currentCustomIcon
            : defaultCustomIcon,
        })
          .addTo(layer);
      });

    }

    return () => {
      layer?.clearLayers();
    };
  }, [map, defaultCustomIcon, currentCustomIcon, activeCardId, offersToShowOnMap]);


  return (
    <div
      style={{height: '100%', margin: '0 auto', width: `${width}%`, maxWidth:'1144px'}}
      ref = {mapRef}
    >
    </div>);

}


export default Map;


