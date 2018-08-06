import React, { Component } from 'react';
import Header from './Header';
import List from './List'
import '../App.css';

class App extends Component {
    render() {
        return (
        <div className="App">
            <Header />

            <main className="main-content">
                <List />
            </main>

        </div>
        );
    }
}

export default App;
