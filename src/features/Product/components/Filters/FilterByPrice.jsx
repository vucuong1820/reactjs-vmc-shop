import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, TextField, Typography, withStyles } from '@material-ui/core';
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}
NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CustomTextField = withStyles(theme => ({
    root: {
      '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: theme.palette.primary.main,
        }
      },
    },
  }))(TextField);

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  range: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  field: {
    marginBottom: theme.spacing(1),
  },
  button: {
      '&:hover': {
          borderColor: theme.palette.primary.main
      }
  }
}));

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: '',
    salePrice_lte: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleConfirm = () => {
    if (!onChange) return;
    onChange(values);
    setValues({
        salePrice_gte: '',
        salePrice_lte: '',
    });
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">CHỌN KHOẢNG GIÁ</Typography>

      <Box className={classes.range}>
        <CustomTextField 
        className={classes.field}
        name="salePrice_gte" 
        placeholder='Min'
        value={values.salePrice_gte}
        variant="outlined"
        size='small'
        onChange={handleChange} 
        fullWidth
        InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
        <span> </span>
        <CustomTextField
        className={classes.field}
        name="salePrice_lte" 
        placeholder='Max'
        value={values.salePrice_lte} 
        variant="outlined"
        size='small'
        color="primary"
        onChange={handleChange} 
        InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      </Box>

      <Button variant="outlined" className={classes.button}  onClick={handleConfirm}>
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
