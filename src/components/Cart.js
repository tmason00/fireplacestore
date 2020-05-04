import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

function Cart(props) {

    const [count, setCount] = React.useState(0);



    return (
                <div className="App">
                    <div className="cart-container">
                        <img src={props.image} alt={props.name} style={{width: "100px", height: "100px"}}/>
                        <div>
                            <h5>{props.name}</h5>
                            <h5>${props.price} </h5>
                            <div>
                            <button onClick={() => setCount(count + 1)}> + </button>
                                {count}
                             <button onClick={() => setCount(count - 1)}> - </button>
                            </div>
                        </div>

                    </div>


                                 </div>
            )
}



export default Cart;