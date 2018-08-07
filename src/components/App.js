import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import List from './List';
import Error from './Error';
import loader from '../images/loader.gif';
import '../css/App.css';

const BASE_URL = 'https://cors.io/?https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?fDstU=100';

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: {},
            flights: [],
            error: '',
            isLoading: true,
            seconds: 0
        }

        this.getFlights = this.getFlights.bind(this);
    }

    componentDidMount = () => {
        //Getting user location
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.setCoords, this.showError);
        }

        this.interval = setInterval(() => this.timer(), 1000);
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

            console.log(response.data.acList)
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

    //Timer to make API call on every 60 secs
    timer() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));

        if(this.state.seconds === 60){
            this.getFlights();
            this.setState({seconds: 0});
        }
    }

    render(){
        return (
            <div className="App">
                <Header />

                <main className="main-content">
                    <h3>List of all airplanes that are flying over current location of user</h3>
                    { this.state.isLoading && <img src={loader} alt="Loading" className="loader" /> }
                    { this.state.error === '' && <List flights={this.state.flights} />}
                    { this.state.error !== '' && <Error content={this.state.error} />}
                </main>
            </div>
        );
    }
}

export default App;
