import React from 'react';
import ListItem from './ListItem';
import '../css/List.css';

const List = props => (
    <div className="flights-list">
        {props.flights.length !== 0 &&
            <li className="list-header">
                <div>Number</div>
                <div>Direction</div>
                <div>Altitude</div>
                <div>Flight code</div>
            </li>
        }

        { [...props.flights].sort((a, b) => b.Alt - a.Alt).map( (flight, i) => {
                return (
                    <ListItem flight={flight} key={flight.Id} number={i} />
                );
            })
        }

    </div>
);

export default List;
