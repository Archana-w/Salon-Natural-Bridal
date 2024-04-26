import { useState } from 'react';
import './ImageButton.css';

function ImageButton({ children, background = "#e9e9e9", backgroundActive = "#dadada",onClick = null}){

    const [imageButtonActive,setImageButtonActive] = useState(false);

    var btnBackground = background;
    if(imageButtonActive){
        btnBackground = backgroundActive;
    }

    function onImageButtonClick(){
        if (onClick != null){
            onClick();
        }
    }

    return(
        <div onMouseDown={() => { setImageButtonActive(true) }} onMouseUp={() => { setImageButtonActive(false) }} onClick={onImageButtonClick} className="image-button" style={{ background: btnBackground }}>
            {children}
        </div>
    );
}

export default ImageButton;