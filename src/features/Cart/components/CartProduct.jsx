import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

CartProduct.propTypes = {
  count: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),

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
  const currentUserId = useSelector(state => state.user.current.id)
  const cartItemList = useSelector((state) => state.cart.cartItems[currentUserId]);
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Giỏ hàng ({`${count || 'chưa có'} sản phẩm`})
      </Typography>
      <ul className={classes.listProduct}>
        {cartItemList.map((item) => (
          <li key={item.id}>
            <CartItem item={item} userId={currentUserId} />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default CartProduct;
