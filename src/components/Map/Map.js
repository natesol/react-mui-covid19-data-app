import React from 'react';
import { Card } from '@material-ui/core';
import Leaflet from 'leaflet';
import { Map as LeafletMap, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import numeral from 'numeral';

import { mapData } from '../../utility/variables';

import './Map.css';

export const showCirclesOnMap = (data, caseType = 'cases') => {
    const calcRadius = (amount, multiplier) => {
        const radius = Math.sqrt(amount) * multiplier;
        const [min, max] = [10_000, 100_000_000];

        return radius < min ? min : (radius > max ? max : radius);
    }

    const caseTypeColors = {
        cases: {
            color: 'var(--red)',
            multiplier: 300,
        },
        active: {
            color: 'var(--blue)',
            multiplier: 350,
        },
        recovered: {
            color: 'var(--green)',
            multiplier: 300,
        },
        deaths: {
            color: 'var(--black)',
            multiplier: 900,
        },
    };

    if (data) {
        caseType = caseType === 'activecase' ? 'active' : caseType;

        const circles = data.map( country => (
            <Circle
                center={[
                    country.countryInfo ? country.countryInfo.lat : mapData.initLat,
                    country.countryInfo ? country.countryInfo.long : mapData.initLng,
                ]}
                fillOpacity={0.4}
                fillColor={caseTypeColors[caseType].color}
                color={caseTypeColors[caseType].color}
                radius={calcRadius(country[caseType], caseTypeColors[caseType].multiplier)}
            >
                <Popup>
                    <div className='info-container'>
                        <div
                            className='info-flag'
                            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                        ></div>
                        <div className='info-name'>{country.country}</div>
                        <div className='info-cases'>Cases : {numeral(country['cases']).format('0,0')}</div>
                        <div className='info-activecase'>
                            Active : {numeral(country['active']).format('0,0')}
                        </div>
                        <div className='info-recovered'>
                            Recovered : {numeral(country['recovered']).format('0,0')}
                        </div>
                        <div className='info-deaths'>Deaths : {numeral(country['deaths']).format('0,0')}</div>
                    </div>
                </Popup>
            </Circle>
        ));
        return circles;
    }
}


const Map = ({ mapRef, theme, center, countries, caseType }) => {
    const lightMap = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const darkMap = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png";

    const corner1 = Leaflet.latLng(-100, -210);
    const corner2 = Leaflet.latLng(100, 210);
    const bounds = Leaflet.latLngBounds(corner1, corner2);

    return (
        <Card className="map">
            <LeafletMap
                ref={mapRef}
                center={center}
                zoom={mapData.initZoom}
                minZoom={mapData.minZoom}
                maxZoom={mapData.maxZoom}
                maxBoundsViscosity={0.8}
                maxBounds={bounds}
            >
                <TileLayer
                    url={theme === 'light' ? lightMap : darkMap}
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                >
                </TileLayer>

                { countries.length && (showCirclesOnMap(countries, caseType)) }
            </LeafletMap>
        </Card>
    )
};

export default Map;
