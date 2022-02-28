import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants/index';
import { formatPrice } from '../../../utils';
import QuantityField from '../../../components/form-controls/QuantityField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setQuantity } from '../cartSlice';
import { useDispatch, useSelector } from 'react-redux';


CartItem.propTypes = {
  item: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(3),
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.grey[300]}`
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
  totalPrice: {
    marginLeft: theme.spacing(2),
    '& > span':{
      fontWeight: 'bold',
      fontSize: '20px'
    }
  },
}));

function CartItem({ item }) {
  const dispatch = useDispatch()
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
  const handleUpdateQuantity = ({quantity}) => {
    const action = setQuantity({
      id: item.id,
      quantity
    })
    dispatch(action)
  }
  const totalPrice = item.quantity * item.product.salePrice
  const classes = useStyles();
  const thumbnailUrl = item.product.thumbnail?.url
    ? `${STATIC_HOST}${item.product.thumbnail.url}`
    : THUMBNAIL_PLACEHOLDER;
  const name = item.product.name;
  return (
      <Box className={classes.root} minHeight="215px">
        <img src={thumbnailUrl} alt={name} className={classes.img} />
        <Box className={classes.name}>
          <Typography>{item.product.name} </Typography>
        </Box>
        <Typography className={classes.price}>{formatPrice(item.product.salePrice)}</Typography>
        <QuantityField form={form} name="quantity" onChange={handleUpdateQuantity} item={item}/>
        <Typography className={classes.totalPrice}>Thành tiền: <span>{`${formatPrice(totalPrice)}`}</span></Typography>
      </Box>
  );
}

export default CartItem;
