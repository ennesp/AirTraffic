import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
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
        let img;
        axios(`${LOGO_FINDER_URL}${company}`).then(response => {
            if(response.data.length > 0){
                img = response.data[0].logo;
                this.setState({logo: img})
            }
        });

        return img;
    }

    componentDidMount = () => {
        if(this.props.location.state){
            this.getCompanyLogo(this.props.location.state.flight.Op);
        }
    }

    render(){
        let flight = {};
        if(this.props.location.state){
            flight = this.props.location.state.flight;
        }

        return (
            <div className="App">
                <Header />

                <main className="main-content">
                    <p style={{textAlign: 'left'}}>
                        <Link to={{ pathname: `/` }}>Go Back</Link>
                    </p>

                    <h3 style={{marginTop: '15px'}}>Flight Details</h3>

                    <div className="flight-details">
                        <div className="info">
                            <span>Company: </span>
                            <span>
                                {this.state.logo && <img className="company-logo" src={this.state.logo} alt={flight.Op} />}
                                {this.state.logo === '' && flight.Op}
                            </span>
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
