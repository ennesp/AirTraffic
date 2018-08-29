import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import AirplaneMarker from './AirplaneMarker';

const AirplaneMap = withScriptjs(withGoogleMap((props) => {
        const markers = props.airplanes.map( airplane => 
            <AirplaneMarker 
                key={airplane.Id}
                airplane={airplane}
                location={{
                    lat: airplane.Lat,
                    lng: airplane.Long
                }}
            />
        );
        
        let location, zoom;
        if(props.coords.lat){
            zoom = 10;
            location = props.coords;
        }else{
            location = {
                lat: 44.63,
                lng: 28.77
            };
            zoom = 2;
        }

        return(
            <GoogleMap 
                zoom={zoom}
                center={location}
            >
                { markers }
            </GoogleMap>
        );
    }
));

export default AirplaneMap;