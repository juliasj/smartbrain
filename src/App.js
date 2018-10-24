import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import './App.css';

const app = new Clarifai.App({
    apiKey: '13e3769e3b894c0386d3bf5367666037'
});

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
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        });
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        
        return {
            leftColumn: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightColumn: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        };
    };

    displayFaceBox = (box) => {
        this.setState({ box: box });
    };

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    };

    onPictureSubmit = () => {
        this.setState({ imageUrl: this.state.input });

        app.models
            .predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input
            )
            .then((res) => {
                if (res) {
                    fetch('http://localhost:3000/image', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then((res) => res.json())
                        .then((count) => {
                            this.setState(Object.assign(this.state.user, { entries:count }));  
                        });
                }
                this.displayFaceBox(this.calculateFaceLocation(res))
            })
            .catch((err) => console.error(err));
    };

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({ isSignedIn: false });
        } else if (route === 'home') {
            this.setState({ isSignedIn: true });            
        }
        this.setState({ route: route });
    };

    render() {
        const { isSignedIn, user, imageUrl, route, box } = this.state;
        return (
            <div className="App">
                <Particles
                    params={ particlesOptions }
                    className='particles'
                />
                <Navigation isSignedIn={ isSignedIn } onRouteChange={ this.onRouteChange }/>
                { route === 'home' 
                    ? <div>
                        <Logo />
                        <Rank name={ user.name } entries={ user.entries }/>
                        <ImageLinkForm
                            onInputChange={ this.onInputChange }
                            onPictureSubmit={ this.onPictureSubmit }
                        />
                        <FaceRecognition
                            imageUrl={ imageUrl }
                            box = { box }
                        />
                    </div>
                    :(
                        route === 'signin'
                        ? <SignIn loadUser={ this.loadUser } onRouteChange={ this.onRouteChange } />
                        : <Register loadUser={ this.loadUser } onRouteChange={ this.onRouteChange } />
                    )
                    
                }
                
                
            </div>
        );
    }
}

export default App;
