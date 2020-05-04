import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

function Cart(props) {

    const [count, setCount] = React.useState(0);



            /* Styled Button */

            const StyledButton = withStyles({
                root: {
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    borderRadius: 3,
                    border: 0,
                    color: 'white',
                    padding: '0 30px',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                },
                label: {
                    textTransform: 'capitalize',
                },
            })(Button);

            /* End Styled Button */


    return (
                <div className="App">
                    <div className="cart-container">
                        <img src={props.image} alt={props.name} style={{width: "100px", height: "100px"}}/>
                        <div>
                            <h5>{props.name}</h5>
                            <h5>${props.price} </h5>
                            {count}
                        </div>
                        <div>
                            <StyledButton variant="contained" onClick={() => setCount(count + 1)}> + </StyledButton>
                            <StyledButton variant="contained" onClick={() => setCount(count - 1)}> - </StyledButton>
                        </div>
                    </div>


                                 </div>
            )
}



export default Cart;