import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

CartProduct.propTypes = {
  count: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 0),
  },
  title: {
    fontWeight: 'bold',
  },
  listProduct: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
}));
function CartProduct({ count }) {
  const cartItemList = useSelector((state) => state.cart.cartItems);
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Giỏ hàng ({`${count} sản phẩm`})
      </Typography>
      <ul className={classes.listProduct}>
        {cartItemList.map((item, index) => (
          <li key={index}>
            <CartItem item={item} />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default CartProduct;
