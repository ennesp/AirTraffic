import React from 'react';
import ListItem from './ListItem';
import '../List.css';

const List = props => (
    <div className="flights-list">
        <li className="list-header">
            <div>&nbsp;</div>
            <div>Altitude</div>
            <div>Flight code</div>
        </li>

        { props.flights.map( flight => {
            return (
                <ListItem flight={flight} key={flight.Id} />
            );
        })}

    </div>
)

export default List;
