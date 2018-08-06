import React, { Component } from 'react';
import Header from './Header';
import List from './List'
import '../App.css';

const URL = 'https://cors-anywhere.herokuapp.com/https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lfDstU=120';

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: {},
            error: ''
        }

        this.getFlights = this.getFlights.bind(this);
    }

    render(){
        return (
            <div className="App">
                <Header />

                <main className="main-content">
                    <List />
                </main>

            </div>
        );
    }

    componentDidMount(){
        //Getting user location
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getFlights, this.showError);
        }
    }

    getFlights(position){
        this.setState({
            location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        });
        console.log(this.state.location)
    }

    showError(error) {
        let err;
        switch(error.code) {
            case error.PERMISSION_DENIED:
                err = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                err = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                err = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                err = "An unknown error occurred."
                break;
        }

        this.setState({
            error: err
        });
    }
}

export default App;
