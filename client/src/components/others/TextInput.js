import './TextInput.css';

function TextInput({placeholder}){

    return(
        <div className="text-input-container">
            <div className="text-input">
                <input type="text" placeholder={placeholder}/>
                <div className="text-input-live-bar"></div>
            </div>
        </div>
    );
}


export default TextInput;