import React from 'react';
import fire from "../Fire";
import {withStyles} from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

function Store(){

    /* Product */
    const [products, setProducts]=React.useState([]);
    const [number, changeNumber]=React.useState(0);
    const[list, addList]=React.useState([]);
    const [color, changeColor]=React.useState("black");

    const db = fire.firestore();

    const StyledButton = withStyles({
        root: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        label: {
            textTransform: 'capitalize',
        },
    })(Button);


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

                if (item.stock>100){
                    changeColor("red")
                }

                if (item.stock<10){
                    changeColor("blue")
                }

                storeProducts.push(item);
            });

            setProducts(storeProducts);
        });

    }, [db, number]);

    /* Dialog */

    const styles = (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;

        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    const DialogContent = withStyles((theme) => ({
        root: {
            padding: theme.spacing(2),
        },
    }))(MuiDialogContent);

    const DialogActions = withStyles((theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(1),
        },
    }))(MuiDialogActions);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    /* End Dialog */


    /* Cart Button */

    const CartButton = (props) => (
        props.status ?
            <StyledButton label="Remove from Cart" icon="remove" color="red" {...props}/> :
            <StyledButton label="Add to Cart" icon="plus" {...props}/>
    );



    /* End Cart Button */


       let itemImg = products.map((dg, idx)=>
        <div key={idx} className='product-container'>
            <img src={dg.image} alt={dg.name}  onClick={handleClickOpen}/>
            <Dialog onClose={handleCloseDialog} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
                    {dg.name}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <img src={dg.image} alt={dg.name}/>
                    </Typography>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                        ${dg.price}.99
                    </Typography>
                    <Typography gutterBottom>
                        IN STOCK ({dg.stock})
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <div>  {number}  </div>
                    <CartButton onClick={()=> changeNumber(number+1)}> + </CartButton>
                    <CartButton onClick={()=> changeNumber(number-1)}> - </CartButton>
                </DialogActions>
            </Dialog>
        </div>
    );



    React.useEffect(()=>{
        let newList=list;


        if(number> 100){
            newList.push("Odd");
            changeColor("red");
        }

        if(number< 10){
            changeColor("blue");
        }

        addList(newList);

    },[number]);


    let style={
        height: "400px",
        width: "400px",
        backgroundColor: color
    };

    let boxes=list.map((it, idx)=>
        <div style={style}> </div>
    );


    return (
        <div className="App">
            {itemImg} {boxes}
        </div>

    );
}

export default Store;