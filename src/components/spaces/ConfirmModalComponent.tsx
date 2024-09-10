import React from 'react';
import './ConfirmModalComponent.css';

type ConfirmModalComponentProps = {
    show: boolean,
    content: string,
    close: () => void
}

const ConfirmModalComponent = ({show, content, close}: ConfirmModalComponentProps) => { 
    if(!show) {
        return null
    } else {
        return (
            <div className='modal'> 
                <div className='modal-content'>
                    <h2>You tried to reserve and ...</h2>
                    <h3 className='modal-text'>{content}</h3>
                    <button onClick={() => close()}>Ok, close</button>
                </div>
            </div> 
        )
    }
}

export default ConfirmModalComponent;