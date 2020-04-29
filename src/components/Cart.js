import React from 'react';

function Cart(props){

    const [stock, setStock] =  React.useState(0);
    const[cart, addCart]=React.useState([]);
    const [name] =  React.useState(props.name);
    const [image] =  React.useState(props.image);

    React.useEffect(()=>{
        let newCart=cart;
        newCart.push(product);

        addCart(newCart);

        },[stock]);

    let style={
        height: "100px",
        width: "100%",
    };

    let product=cart.map((it, idx)=>
        <div style={style}>
            <h3>{name}</h3>
            <thumbnail src={image} alt={name}/>
        </div>
    );


    return (
        <div className={"Cart"}>
            <button onClick={()=> setStock(stock+1)}> + </button>
            <button onClick={()=> setStock(stock-1)}> - </button>
            <div>  {stock} </div>
            {product}
           </div>
    );
}

export default Cart;