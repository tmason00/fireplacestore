import React from 'react';


function Store(props){



    return (
        <div className="App">
            <div className="product-container">
                <div>
            <img src={props.image} alt={props.name} />
            </div>
        </div>
        </div>

    );
}

export default Store;