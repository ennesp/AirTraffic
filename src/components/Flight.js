import React from 'react';
import Header from './Header';

const Flight = (props) => {
    const flight = props.location.state.flight;
    console.log(flight);

    return (
        <div className="App">
            <Header />

            <main className="main-content">
                <div>Flight Item</div>
            </main>
        </div>
    );

}

export default Flight;
