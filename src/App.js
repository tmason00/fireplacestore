import React from 'react';
import './App.css';
import fire from "./Fire";
import Cart from "./components/Cart";
import Product from "./components/Product";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import Form from "./Form";



/* Material UI */
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Store from "./components/Store";



function App(props) {

    const [products, setProducts]=React.useState([]);
    const [cart, updateCart]=React.useState([]);
    const [stock, setStock]=React.useState([props.stock]);



    const db = fire.firestore();

/* App Menu Bar */

    const useStylesError = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));
    const classes = useStylesError();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    /* End App Menu Bar */


    /* Products */

    React.useEffect(()=>{
        let storeProducts =[];

        db.collection("fireplaces").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                const object = doc.data();

                let item = {
                    image: object.image,
                    name: object.name,
                    price: object.price,
                    stock: object.stock,
                    id: doc.id
                };

               storeProducts.push(item);
            });

            setProducts(storeProducts);
        });

    }, [db]);

    let item = products.map ((it,idx,)=>
        <Product key={idx} image={it.image} name={it.name} price={it.price} stock={it.stock}/>,
    );
    /* End Products */

    /* Cart */

    React.useEffect(()=>{
        let cartProducts =[];

        db.collection("fireplaces").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                const object = doc.data();

                let item = {
                    image: object.image,
                    name: object.name,
                    price: object.price,
                    stock: object.stock,
                    id: doc.id
                };

                cartProducts.push(item);
            });

            updateCart(cartProducts);
        });

    }, [db]);

    let cartItems = cart.map ((it,idx,)=>
        <Cart key={idx} image={it.image} name={it.name} price={it.price} stock={it.stock}/>,
    );

    /* End Cart */



    /* Drawer */
    const useStyles = makeStyles({
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
    });

       const classesDrawer = useStyles();
        const [state, setState] = React.useState({
            right: false,
        });

        const toggleDrawer = (anchor, open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

        const list = (anchor) => (
            <div
                className={clsx(classesDrawer.list, {
                    [classesDrawer.fullList]: anchor === 'top' || anchor === 'bottom',
                })}
                role="presentation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <List>
                    {['cart'].map((text, index) => (
                        <ListItem button key={text}>
                            <ShoppingCartIcon />
                        </ListItem>
                    ))}
                </List>

            </div>
        );




        return (
            <Router>
            <div className="App">
        <div className={classes.root}>
            <AppBar color="default" position="static" >
                <Toolbar>
                    <Button edge="start" className={classes.menuButton} color="primary" aria-label="menu">
                        <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}><NavLink exact to={"/"}>Store</NavLink></MenuItem>
                        <MenuItem onClick={handleClose}><NavLink to={"/admin/"}>Admin</NavLink></MenuItem>
                        <MenuItem onClick={handleClose}><NavLink to={"/cart/"}>Cart</NavLink></MenuItem>


                    </Menu>
                    <Typography variant="h5" className={classes.title}>
                        The Fireplace Store
                    </Typography>
                     <div>
                        {['cart'].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                                    {list(anchor)} {cartItems}
                                    <Button variant="contained" color="primary" onClick={()=>setStock(stock-1) + alert("Thank you for your purchase!")}> Complete Purchase </Button>
                                </Drawer>
                            </React.Fragment>
                        ))}
                    </div>
                </Toolbar>
            </AppBar>

            <div className="product-container">
               {item}

             </div>

          </div>
        </div>

                <Switch>
                    <main>
                        <Route path={"/store"} exact component={Store}/>
                        <Route path={"/cart"} component={Cart}>{cartItems}
                        </Route>
                        <Route path={"/admin"} component={Form}>
                        </Route>



                    </main>

                </Switch>
            </Router>




);
}

export default App;