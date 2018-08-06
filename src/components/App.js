import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import List from './List';
import Error from './Error';
import '../App.css';

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?fDstU=120';

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: {},
            flights: [],
            error: ''
        }

        this.getFlights = this.getFlights.bind(this);
    }

    componentDidMount = () => {
        //Getting user location
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getFlights, this.showError);
        }
    }

    getFlights = position => {
        this.setState({
            location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        });

        const location = this.state.location;

        const URL = `${BASE_URL}&lat=${location.lat}&lng=${location.lng}`;

        //Getting flights data
        axios(URL).then(response => {
            this.setState({
                flights: response.data.acList
            });

            console.log(this.state.flights);
        });

    }

    //Display error if location is unavailable
    showError = error => {
        let err;
        switch(error.code) {
            case error.PERMISSION_DENIED:
                err = "Location is not available. Allow location so we can show airplanes that are flying over your location."
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
            default:
                err = ''
        }

        this.setState({
            error: err
        });
    }

    render(){
        return (
            <div className="App">
                <Header />

                <main className="main-content">
                    <h3>List of all airplanes that are flying over current location of user</h3>
                    { this.state.error === '' && <List flights={this.state.flights} />}
                    { this.state.error !== '' && <Error content={this.state.error} />}
                </main>
            </div>
        );
    }
}

export default App;
