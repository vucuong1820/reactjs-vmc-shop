import { Box, FormHelperText, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setQuantity } from  "../../../features/Cart/cartSlice"

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  item: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
  },

  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '160px',
  }
}))
function QuantityField(props) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { form, name, label, disabled, onChange, item } = props;
  const { errors, setValue, getValues } = form;
  const hasError = errors[name];
  const handleIncrease = (value) => {
    if(item){
      setValue(name, Number.parseInt(item.quantity) ? Number.parseInt(item.quantity) + 1 : 1)
    }else{
      setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)
    }
    if(onChange) onChange(getValues())
  };
  const handleDecrease = (value) => {
    if(item){
      setValue(name, Number.parseInt(item.quantity) ? Number.parseInt(item.quantity) - 1 : 1)
    }else{
      setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)
    }
    if(onChange) onChange(getValues())
  }
  return (
    <div>
      <FormControl error={!!hasError} fullWidth margin="normal" variant="outlined" size="small">
        <Typography className={classes.label}>{label}</Typography>
        <Controller
          name={name}
          control={form.control}
          render={({ onChange, onBlur, value, name, ref }) => (
            <Box className={classes.box}>
              <IconButton onClick={() => handleDecrease(value)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
              <OutlinedInput
                id={name}
                type="number"
                disabled={disabled}
                name={name}
                value={value}
                onChange={(e) => {
                  onChange()
                  const action = setQuantity({
                      id: item.id,
                      quantity: Number.parseInt(e.target.value)
                  })
                  dispatch(action)
                }}
                onBlur={onBlur}
              />
              <IconButton onClick={() => handleIncrease(value)}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
          )}
        />
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default QuantityField;
