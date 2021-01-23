import React from 'react';

export const Loader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <div className="lds-hourglass"></div>
        </div>
    )
}