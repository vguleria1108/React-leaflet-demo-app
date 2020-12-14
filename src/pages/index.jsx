import React, { Component, useRef } from "react";
import { Map, TileLayer, Marker, Popup, Tooltip,LayersControl,FeatureGroup } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { studentPoints } from './studentPoints';
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: null
});

L.Marker.prototype.options.icon = DefaultIcon;
export default function Index(props) {
    const mapRef = useRef();
    const currentLocation = () => {
        const { current = {} } = mapRef;
        const { leafletElement: map } = current;
        let loc = map.locate({
            view: false
        }).on('locationfound', (e) => {
            goToLocation([e?.latitude, e?.longitude])
        });
    }

    const goToLocation = (data) => {
        const { current = {} } = mapRef;
        const { leafletElement: map } = current;
        if (data)
            map.flyTo(data, 23);
    }

    return (
        <>
            <div className="mapWrapper">
                <button onClick={() => currentLocation()}>Current Location</button>
                <Map
                    className="markercluster-map"
                    center={[37.6367577, -122.4922122]}
                    zoom={15}
                    maxZoom={18}
                    ref={mapRef}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
    
                    <LayersControl position="topright" collapsed={false}>
                        <LayersControl.Overlay checked name="Student Layer">
                            <FeatureGroup >
                            <MarkerClusterGroup>
                            {
                                studentPoints.map(function (student) {
                                    return (
                                        <Marker position={[student[0], student[1]]}>
                                            <Popup >
                                                {student[2]}
                                            </Popup>
                                            <Tooltip>
                                                {student[2]}
                                            </Tooltip>
                                        </Marker>)
                                })
                            }
                        </MarkerClusterGroup>
                            </FeatureGroup>
                        </LayersControl.Overlay>
                    </LayersControl>
                </Map>

            </div>

            <style jsx="true">
                {`
                    .mapWrapper{
                        height: 300px;
                        width: 900px;
                        align-content: center;
                    }
                    .leaflet-container {
                        height: 400px;
                        width: 100%;
                        padding: 50px;
                    }
                    `}
            </style>
        </>
    );
}