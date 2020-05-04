import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

function Product(props){

    const [count, setCount]=React.useState(0);
    const [stock, setStock]=React.useState([props.stock]);


    /* Styled Button */

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

    /* End Styled Button */


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




    return(
        <div className="App">
            <div className="product-container">
                <img src={props.image} alt={props.name} onClick={handleClickOpen}/>
            <Dialog onClose={handleCloseDialog} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
                    {props.name}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <img src={props.image} alt={props.name}/>
                    </Typography>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                        ${props.price}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <div>  IN STOCK: {stock} </div>
                    <StyledButton onClick={()=>setCount(count+1) + setStock(stock-1)}> + </StyledButton>
                    <div style={{padding: "5px"}}>  {count} </div>
                    <StyledButton onClick={()=>setCount(count-1) + setStock(stock+1)}> - </StyledButton>
                </DialogActions>
            </Dialog>
        </div>
        </div>
    )

}



export default Product;