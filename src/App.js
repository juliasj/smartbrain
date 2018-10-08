import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';

import './App.css';

const particlesOptions = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#D2D2D2'
        },
        line_linked: {
            color: '#D2D2D2'
        },
        move: {
            speed: 3
        }
    }
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <Particles
                    params={particlesOptions}
                    className='particles'
                />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm />
                {/*<FaceRecognition />*/}
            </div>
        );
    }
}

export default App;
