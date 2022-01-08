import { React, Fragment } from 'react';
import './Modal.css';

import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';

const ModalOverlay = (props) => {
    return(<div className={'modal ' + props.className}>
        <div className='modal__content'>{props.children}</div>
    </div>)
}

const Modal = (props) => {
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop className='backdrop' onHide={props.onHide}></Backdrop>, document.getElementById('root-popup'))}
            {ReactDOM.createPortal(<ModalOverlay className={props.className}> {props.children}</ModalOverlay>, document.getElementById('root-popup'))}
        </Fragment>
    )
}

export default Modal;