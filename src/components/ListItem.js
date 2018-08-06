import React from 'react';
import plane from '../images/plane.png';

const ListItem = (props) => (
    <li className="flight-item">
        <div>
            <img src={plane} alt="PLane" style={{width: 30+'px'}} className={props.flight.Trak < 180 ? '' : 'rotated'} />
        </div>
        <div>
            { props.flight.Alt }
        </div>
        <div>
            { props.flight.Id }
        </div>
    </li>
)

export default ListItem;
