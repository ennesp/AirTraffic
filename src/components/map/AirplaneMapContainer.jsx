import React, { Component } from 'react';
import AirplaneMap from './AirplaneMap';

class AirplaneMapContainer extends Component{
    render(){
        return(
            <AirplaneMap
                airplanes={ this.props.airplanes }
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyB0frxqYG8nWXCKIn0VPsP4b-4zT5dlNXA&v=3.exp`}
                loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `600px`, width: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                coords={this.props.coords}
            />
        );
    }
};

export default AirplaneMapContainer;