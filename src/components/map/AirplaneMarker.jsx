import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

class AirplaneMarker extends Component{
    constructor(props){
        super(props);

        this.state = {
            isOpen: false
        }
    };

    image = {
        path: "M510,255c0-20.4-17.85-38.25-38.25-38.25H331.5L204,12.75h-51l63.75,204H76.5l-38.25-51H0L25.5,255L0,344.25h38.25l38.25-51h140.25l-63.75,204h51l127.5-204h140.25C492.15,293.25,510,275.4,510,255z",
        rotation: this.props.airplane.Trak-90,
        fillColor: '#22313F',
        fillOpacity: 1,
        strokeWeight: 0,
        scale: .06,
    };

    handleInfoUpdate = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render(){
        return(
            <Marker 
                position={this.props.location}
                icon={this.image}
                onClick={this.handleInfoUpdate}
            >

            { this.state.isOpen && <InfoWindow onCloseClick={this.handleInfoUpdate}>
                <div className="info-window">
                    <p><span>Company:</span> {this.props.airplane.Op}</p>
                    <p><span>From:</span> {this.props.airplane.From}</p>
                    <p><span>To:</span> {this.props.airplane.To}</p>
                    <p><span>Altitude:</span> {this.props.airplane.Alt}</p>
                    <p><span>Flight ID:</span> {this.props.airplane.Id}</p>
                </div>
            </InfoWindow> }

            </Marker>
        );
    }
};

export default AirplaneMarker;