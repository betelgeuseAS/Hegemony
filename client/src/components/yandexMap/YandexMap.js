import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  YMaps,
  Map,
  FullscreenControl,
  GeolocationControl,
  SearchControl,
  TypeSelector,
  ZoomControl
} from 'react-yandex-maps';

import "./YandexMap.sass";

import location from "../../img/control/location.svg";

class YandexMap extends Component {
  changeMap = (e) => {
    console.log(e);
  };

  render() {
    return (
      <div className="map">
        <div className="marker">
          <img src={location} alt="Location"/>
        </div>

        <YMaps query={{ lang: 'en_RU' }}>
          <div>
            <Map
              defaultState={{ center: [55.75, 37.57], zoom: 9 }}
              width={'100%'}
              height={'350px'}
            >
              <FullscreenControl />
              <GeolocationControl options={{ float: 'left' }} />
              <SearchControl options={{ float: 'right' }} />
              <TypeSelector options={{ float: 'right' }} />
              <ZoomControl options={{ float: 'right' }} />
            </Map>
          </div>
        </YMaps>
      </div>
    );
  }
}

YandexMap.propTypes = {};

export default YandexMap;
