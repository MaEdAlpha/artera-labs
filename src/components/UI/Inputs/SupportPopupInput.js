import { Fragment } from 'react';

import './SupportPopupInput.css';

const SupportPopupInput = (props) =>{

    //set onChange method to use debounce maybe.
    return(
        <Fragment>
            <input 
                className="support__input" 
                type="number"
                value={props.amount}                  
                onChange={e => {props.setAmountToSendHandler(e.target.value)}}
                required 
                autoFocus></input>
        </Fragment>
    )
};

export default SupportPopupInput;

//TODO Validator
//Must be a number
//Must be <= balance
//Support Button is disabled until user inputs proper value