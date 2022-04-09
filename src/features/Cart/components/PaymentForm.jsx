import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControlLabel, LinearProgress, makeStyles, Radio, RadioGroup, Typography } from '@material-ui/core';
import InputField from '../../../components/form-controls/InputField';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from '../selectors';
import emailjs from '@emailjs/browser';
import { formatPrice } from '../../../utils/common';
import { useSnackbar } from 'notistack';
PaymentForm.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

function PaymentForm(props) {
  const { enqueueSnackbar } = useSnackbar();
  const currentUserId = useSelector((state) => state.user.current.id);
  const [isSubmit, setIsSubmit] = useState(false);
  const cartItemList = useSelector((state) => state.cart.cartItems[currentUserId]);
  const cartTotalPrice = useSelector(cartTotalSelector);
  const classes = useStyles();

  const schema = yup.object().shape({
    username: yup.string().required('Vui lòng nhập tên của bạn'),
    email: yup.string().required('Vui lòng nhập email của bạn').email('Vui lòng nhập email hợp lệ'),
    phone: yup.number().required('Vui lòng nhập số điện thoại của bạn'),
    address: yup.string().required('Vui lòng nhập địa chỉ giao hàng'),
  });
  const generateCartTable = (cartItemList) => {
    return `<table border="1">
    <tr>
        <th>STT</th>
        <th>Tên sản phẩm</th>
        <th>Số lượng</th>
        <th>Đơn giá</th>
        <th>Thành tiền</th>
    </tr>
    ${cartItemList
      .map(
        (cart, index) =>
          `<tr>
          <td>${index + 1}</td>
          <td>${cart?.product?.name}</td>
          <td>${cart?.quantity}</td>
          <td>${formatPrice(cart?.product?.salePrice)}</td>
          <td>${formatPrice(cart?.product?.salePrice * cart?.quantity)}</td>
        </tr>`
      )
      .join('')}
    <tr>
        <td></td>
        <td>Tổng tiền thanh toán</td>
        <td colspan="4">${formatPrice(cartTotalPrice)}</td>
    </tr>
</table>`;
  };

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      phone: '',
      address: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    setIsSubmit(true);
    try {
      const formData = {
        ...values,
        phone: `0${values.phone}`,
        cartTable: generateCartTable(cartItemList),
      };
      await emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, formData, process.env.REACT_APP_EMAILJS_USER_ID);
      enqueueSnackbar('Vui lòng kiểm tra email để xác nhận đơn hàng', { variant: 'success',autoHideDuration: 3000 });
      setIsSubmit(false);
      form.reset();
    } catch (error) {
      console.log('Failed to send: ', error.text);
      enqueueSnackbar(`Xảy ra lỗi trong quá trình xác thực thông tin: ${error.text}`, { variant: 'error',autoHideDuration: 3000 });
      setIsSubmit(false);
    }
  };

  return (
    <div className={classes.root}>
      {isSubmit && <LinearProgress className={classes.progress} />}

      <Typography className={classes.title} component="h3" variant="h5">
        Vui lòng chọn phương thức giao hàng
      </Typography>
      <RadioGroup>
        <FormControlLabel disabled control={<Radio />} label="Chuyển khoản qua ngân hàng/ví điện tử (không khả dụng)" />
        <FormControlLabel checked control={<Radio />} label="Thanh toán khi nhận hàng (COD)" />
      </RadioGroup>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField form={form} name="username" label="Tên khách hàng" />
        <InputField form={form} name="email" label="Địa chỉ email" />
        <InputField form={form} name="phone" type="tel" label="Số điện thoại" />
        <InputField form={form} name="address" label="Địa chỉ" />

        <Button
          disabled={isSubmit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          size="large"
        >
          Xác nhận
        </Button>
      </form>
    </div>
  );
}

export default PaymentForm;
