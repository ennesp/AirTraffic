import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import List from './List';
import Error from './Error';
import loader from '../images/loader.gif';
import '../css/App.css';
import AirplaneMapContainer from './map/AirplaneMapContainer';

const BASE_URL = 'https://cors.io/?https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?fDstL=0&fDstU=70';

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: {},
            flights: [],
            error: '',
            isLoading: true
        }
    }

    componentDidMount = () => {
        //Getting user location
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.setCoords, this.showError);
        }

        this.interval = setInterval(this.getFlights, 60000);
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    setCoords = position => {
        this.setState({
            location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        });

        this.getFlights();
    }

    //Make API call to get Flights data
    getFlights = () => {
        const location = this.state.location;

        const URL = `${BASE_URL}&lat=${location.lat}&lng=${location.lng}`;

        //Getting flights data
        axios(URL).then(response => {
            this.setState({
                flights: response.data.acList,
                isLoading: false
            });
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
                    { this.state.error !== '' && <Error content={this.state.error} />}
                    { this.state.isLoading && <img src={loader} alt="Loading" className="loader" /> }
                    { this.state.error === '' && <List flights={this.state.flights} />}
                    { this.state.error === '' && <AirplaneMapContainer airplanes={this.state.flights} coords={this.state.location} />}
                </main>
            </div>
        );
    }
}

export default App;
