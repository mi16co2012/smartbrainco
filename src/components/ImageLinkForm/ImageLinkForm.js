import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
    return (
        <div>
            <p className= 'f3'>
                {'This App will detect faces, Give it a try.'}
            </p>
            <div className ='center'>
                <div className='pa4 br3 shadow-5 center form'>
                <input type='text' className= 'f4 pa2 w-70 center' onChange={onInputChange}/>
                <button className = 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
                onClick = {onPictureSubmit} >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;