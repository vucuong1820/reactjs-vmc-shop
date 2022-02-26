import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../components/form-controls/InputField';
import QuantityField from '../../../components/form-controls/QuantityField';

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Please enter at least 1')
      .typeError('Please enter an number'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) await onSubmit(values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField form={form} name="quantity" label="Số lượng sản phẩm" />
      <Button type="submit" fullWidth variant="contained" color="primary" size="large" style={{width: '200px'}}>
        Buy
      </Button>
    </form>
  );
}

export default AddToCartForm;
