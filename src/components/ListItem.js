import React from 'react';
import { Link } from "react-router-dom";
import plane from '../images/plane.png';

const ListItem = (props) => (
    <li className="flight-item" id={props.flight.Id}>
        <Link to={{
            pathname: `/flight/${props.flight.Id}`,
            state: { flight: props.flight }
        }}>
            <div>
                {props.number+1}
            </div>
            <div>
                <img src={plane} alt="PLane" style={{width: 30+'px', transform: 'rotate('+(props.flight.Trak-90)+'deg)'}} />
            </div>
            <div>
                { props.flight.Alt }
            </div>
            <div>
                { props.flight.Id }
            </div>
        </Link>
    </li>
);

export default ListItem;
