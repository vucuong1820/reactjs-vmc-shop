import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import CartCustomer from './components/CartCustomer';
import CartProduct from './components/CartProduct';
import { cartItemsCountSelector, cartTotalSelector } from './selectors';
import BlockIcon from '@material-ui/icons/Block';

CartFeature.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4, 0),
  },
  left: {
    flex: '1 1 0',
  },
  right: {
    width: '300px',
  },
  warning: {
    display: 'flex',
    flexFlow: 'row',
    color: 'red',
    justifyContent:'center',
    alignItems: 'center',
    fontWeight: 'bold',
    paddingTop: theme.spacing(10),
    '& > p':{
      fontWeight: 'bold',
      fontSize: '32px',
      marginLeft: theme.spacing(1)
    },
    '& > svg': {
      fontSize: '32px',
    }
  }
}));

function CartFeature(props) {
  const classes = useStyles();
  const cartTotalPrice = useSelector(cartTotalSelector);
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const currentUserId = useSelector((state) => state.user.current?.id);
  console.log('curren user id:',currentUserId)
  return (
    <>
      {
        currentUserId ? (
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
        ):(
            <Box className={classes.warning}>
              <BlockIcon/>
              <Typography >Bạn cần đăng nhập để truy cập trang này</Typography>
            </Box>
        )
      }
    </>
  );
}

export default CartFeature;
