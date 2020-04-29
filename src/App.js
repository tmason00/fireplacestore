import React from 'react';
import './App.css';
import Cart from "./components/Cart";
import Store from "./components/Store";


/* Material UI */
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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



function App() {

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
                        <MenuItem onClick={handleClose}>About</MenuItem>
                        <MenuItem onClick={handleClose}>Shop</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                    <Typography variant="h5" className={classes.title}>
                        The Fireplace Store
                    </Typography>
                    <Button color="inherit">Admin Login</Button>
                    <div>
                        {['cart'].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                                    {list(anchor)} <Cart/>
                                </Drawer>
                            </React.Fragment>
                        ))}
                    </div>
                </Toolbar>
            </AppBar>
           <Store/>


        </div>





);
}

export default App;