import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, IconButton, Typography } from '@material-ui/core';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import { makeStyles } from '@material-ui/core';
import { formatPrice } from '../../../utils/common';
import ConfirmDialog from './ConfirmDialog';

CartCustomer.propTypes = {
  total: PropTypes.number,
};
const useStyles = makeStyles((theme) => ({
  root: {
      padding: theme.spacing(3,0)
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  address: {
    marginBottom: theme.spacing(5),
  },

  sale: {
    margin: theme.spacing(3, 0),
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  price: {
    color: theme.palette.grey[500],
  },
  totalPrice: {
    margin: theme.spacing(3, 0),
    '& > span': {
      marginLeft: theme.spacing(2),
      color: 'red',
      fontSize: '32px',
      fontWeight: 'bold',
    },
  },
}));

function CartCustomer({ total }) {
  const [openDialog, setOpenDialog] = useState(false)
  const classes = useStyles();
  const customerName = JSON.parse(localStorage.getItem('user')).fullName;
  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>Giao tới</Typography>
      <Typography>Khách hàng: {customerName}</Typography>
      <Typography className={classes.address}>Địa chỉ: </Typography>
      <Typography>Khuyến mãi: </Typography>
      <Box className={classes.sale}>
        <IconButton color="primary">
          <ConfirmationNumberOutlinedIcon />
        </IconButton>
        <Typography>Chọn hoặc nhập mã khuyến mãi </Typography>
      </Box>

      <Box className={classes.price}>
        <Typography>Tạm tính: {formatPrice(total)} </Typography>
        <Typography>Giảm giá: </Typography>
        <Typography className={classes.totalPrice}>
          Tổng cộng: <span>{formatPrice(total)}</span>{' '}
        </Typography>
      </Box>
      <Button onClick={() => setOpenDialog(true)} variant="contained" color="secondary" size="large" fullWidth>
        Mua ngay
      </Button>
      <ConfirmDialog open={openDialog} handleClose={handleCloseDialog}/>
    </Box>
  );
}

export default CartCustomer;
