import React from 'react';
import './App.css';
import fire from "./Fire";

function App() {

    const [product, setProduct]=React.useState([]);
    const [values, setValues]=React.useState({
        name:"",
        image:"",
        price: "",
        stock:""
    });
    const [updated, setUpdate]=React.useState({
        name:"",
        image:"",
        price: "",
        stock:""
    });

    const[updateID, setId]=React.useState("");
    const [showUpdate, toggleUpdate]=React.useState(false);
    const [changed, setChange]=React.useState(false);

    const handleChange = prop=> event=>{
        setValues({...values, [prop]: event.target.value})
    };

    const handleUpdate = prop=> event=>{
        setUpdate({...updated, [prop]: event.target.value})
    };

    const submit=()=>{
        db.collection("fireplace-store").add(values).then(function(){
            setChange(!changed);
            setValues({
                name:"",
                image:"",
                price: "",
                stock:""
            })
        });
    };


    const submitUpdate=()=>{
        db.collection("fireplace-store").doc(updateID).update(updated).then(function () {
            setChange(!changed);
            setUpdate({
                name:"",
                image:"",
                price: "",
                stock:""
            });
            toggleUpdate(false);
        });
    };

const updateOn=(id)=>{
    toggleUpdate(true);
    setId(id);
};

const deleteItem=(id)=>{
    db.collection("fireplace-store").doc(id).delete().then(function(){
        setChange(!changed);
    })
};

const db = fire.firestore();

React.useEffect(()=>{
    let newItem =[];

    db.collection("fireplace-store").orderBy("name").get().then(function(snapshot){
        snapshot.forEach(function(doc){
            const object = doc.data();

            let item = {
                name: object.name,
                image: object.image,
                price: object.price,
                stock: object.stock,
                id: doc.id
            }

            newItem.push(item);
        })

        setProduct(newItem);
    });

}, [db, changed]);


let itemEles = product.map((dg, idx)=>
    <div key={idx}>
        <h1>Name: {dg.name}</h1>
        <img src={dg.image} alt={dg.name}/>
        <h3>Price: ${dg.price}</h3>
        <h3>Stock: {dg.stock}</h3>

        <button onClick={()=>deleteItem(dg.id)}>Delete</button>
        <button onClick={()=>updateOn(dg.id)}>Add</button>
    </div>
);


return (
    <div className="App">
        {itemEles}
        <div>
            <input placeholder={"Name..."} onChange={handleChange("name")} value={values.name}/>
            <input placeholder={"Image..."} onChange={handleChange("image")} value={values.image}/>
            <input placeholder={"Price..."} onChange={handleChange("price")} value={values.price}/>
            <input placeholder={"Stock..."} onChange={handleChange("stock")} value={values.stock}/>

            <button onClick={submit}> Add Product</button>
        </div>
        {showUpdate&&
        <div>
            <input placeholder={"Name..."} onChange={handleUpdate("name")} value={values.name}/>
            <input placeholder={"Image..."} onChange={handleUpdate("image")} value={values.image}/>
            <input placeholder={"Price..."} onChange={handleUpdate("price")} value={values.price}/>
            <input placeholder={"Stock..."} onChange={handleUpdate("stock")} value={values.stock}/>
            <button onClick={submitUpdate}> </button>
        </div>}
    </div>
            );
        }

        export default App;
