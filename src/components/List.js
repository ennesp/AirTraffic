import React from 'react';
import ListItem from './ListItem';
import '../List.css';

const List = props => {
    return(
        <div className="flights-list">
            <li className="list-header">
                <div>Number</div>
                <div>Direction</div>
                <div>Altitude</div>
                <div>Flight code</div>
            </li>

            { [...props.flights].sort((a, b) => a.Alt < b.Alt).map( (flight, i) => {
                return (
                    <ListItem flight={flight} key={flight.Id} number={i} />
                );
            })}

        </div>
    )
}

export default List;
