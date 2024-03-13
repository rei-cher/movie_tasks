import React from 'react';

import './Notification.css';

const Notification = ({message, isVisible}) => {
    if(!isVisible) return null;

    return (
        <div className='notification'>
            {message}
        </div>
    )
}

export default Notification