import React, { Component } from 'react';
import axios from 'axios';
import logo from '../images/logo.png';
import Header from './Header';

const LOGO_FINDER_URL = 'https://autocomplete.clearbit.com/v1/companies/suggest?query=';

class Flight extends Component {

    constructor(props){
        super(props);

        this.state = {
            logo: ''
        }
    }

    getCompanyLogo = company => {
        let img = logo;

        axios(`${LOGO_FINDER_URL}${company}`).then(response => {
            if(response.data.length > 0){
                img = response.data[0].logo;
                this.setState({logo: img})
            }
        });

        return img;
    }

    componentDidMount = () => {
        this.getCompanyLogo(this.props.location.state.flight.Op);
    }

    render(){
        const flight = this.props.location.state.flight;
        console.log(flight)
        return (
            <div className="App">
                <Header />

                <main className="main-content">
                    <div>Flight Details</div>

                    <div className="flight-details">
                        <div className="info">
                            {this.state.logo && <img className="company-logo" src={this.state.logo} alt={flight.Op} />}
                        </div>

                        <div className="info">
                            <span>Airplane Manufacturer and model: </span>
                            <span>{flight.Mdl}</span>
                        </div>

                        <div className="info">
                            <span>From: </span>
                            <span>{flight.From}</span>
                        </div>

                        <div className="info">
                            <span>To: </span>
                            <span>{flight.To}</span>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

}

export default Flight;
