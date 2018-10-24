import React from 'react';

import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center'>
                <div className='center pa4 br3 shadow-5 form'>
                    <input
                        type='tex'
                        className='f4 pa2 w-70 center'
                        onChange={ onInputChange }
                    />
                    <button
                        className='f4 ph3 pv2 w-30 grow link dib white bg-light-purple'
                        onClick={ onPictureSubmit }
                    >
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;
