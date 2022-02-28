import { Box, Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import CartCustomer from './components/CartCustomer';
import CartProduct from './components/CartProduct';
import { cartItemsCountSelector, cartTotalSelector } from './selectors';

CartFeature.propTypes = {
    
};
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4,0)
    },
    left: {
        flex: '1 1 0'
    },
    right: {
        width: '300px',

    }

}))

function CartFeature(props) {
    const classes = useStyles()
    const cartTotalPrice = useSelector(cartTotalSelector)
    const cartItemsCount = useSelector(cartItemsCountSelector)

    return (
        <Box className={classes.root}>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <CartProduct count={cartItemsCount}/>
                        </Grid>
                        <Grid item className={classes.right}>
                            <CartCustomer total={cartTotalPrice} />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default CartFeature;