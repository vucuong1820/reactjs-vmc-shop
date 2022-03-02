import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import QuantityField from '../../../components/form-controls/QuantityField';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants/index';
import { formatPrice } from '../../../utils';
import { removeFromCart, setQuantity } from '../cartSlice';

CartItem.propTypes = {
  item: PropTypes.object,
  userId: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(3),
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  img: {
    width: '150px',
    objectFit: 'contain',
    marginRight: theme.spacing(5),
  },
  name: {
    marginRight: theme.spacing(2),
    width: '150px',
    textAlign: 'justify',
  },
  price: {
    marginRight: theme.spacing(2),
    minWidth: '100px',
    maxWidth: '200px',
  },
  quantity: {
    minWidth: '150px',
  },

  totalPrice: {
    marginLeft: theme.spacing(2),
    '& > span': {
      fontWeight: 'bold',
      fontSize: '20px',
    },
  },
}));

function CartItem({ item = {}, userId = null }) {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Please enter at least 1')
      .typeError('Please enter an number'),
  });

  const form = useForm({
    defaultValues: {
      quantity: item.quantity,
    },
    resolver: yupResolver(schema),
  });
  const handleUpdateQuantity = ({ quantity }) => {
    const action = setQuantity({
      userId,
      productId: item.id,
      quantity,
    });
    dispatch(action);
  };
  const handleDeleteCart = ({ id }) => {
    const action = removeFromCart({
      userId,
      productId: id,
    });
    dispatch(action);
  };

  const totalPrice = item.quantity * item.product.salePrice || 0;
  const classes = useStyles();
  const thumbnailUrl = item.product.thumbnail?.url
    ? `${STATIC_HOST}${item.product.thumbnail.url}`
    : THUMBNAIL_PLACEHOLDER;
  const name = item.product.name;
  return (
    <>
      <Box className={classes.root} minHeight="215px">
        <img src={thumbnailUrl} alt={name} className={classes.img} />
        <Box className={classes.name}>
          <Typography>{item.product.name} </Typography>
        </Box>
        <Typography className={classes.price}>{formatPrice(item.product.salePrice)}</Typography>
        <Box className={classes.quantity}>
          <QuantityField
            userId={userId}
            form={form}
            name="quantity"
            onChange={handleUpdateQuantity}
            item={item}
            onDelete={handleDeleteCart}
          />
        </Box>
        <Typography className={classes.totalPrice}>
          Thành tiền: <span>{`${formatPrice(totalPrice)}`}</span>
        </Typography>
        <IconButton onClick={() => setOpenDialog(true)}>
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* CONFIRM DIALOG */}
      <Dialog
        open={openDialog}
        onClose={() => false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xác nhận xóa sản phẩm khỏi giỏ hàng</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn sản phẩm đang chọn khỏi giỏ hàng ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Hủy bỏ
          </Button>
          <Button
            onClick={() =>
              dispatch(removeFromCart({userId,productId: item.id}))
            }
            color="primary"
            autoFocus
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CartItem;
