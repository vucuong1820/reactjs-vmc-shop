import { Box, FormHelperText, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};
const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
  },

  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '175px',
  }
}))
function QuantityField(props) {
  const classes = useStyles()
  const { form, name, label, disabled } = props;
  const { errors, setValue } = form;
  const hasError = errors[name];
  return (
    <div>
      <FormControl error={!!hasError} fullWidth margin="normal" variant="outlined" size="small">
        <Typography className={classes.label}>{label}</Typography>

        <Controller
          name={name}
          control={form.control}
          render={({ onChange, onBlur, value, name, ref }) => (
            <Box className={classes.box}>
              <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
              <OutlinedInput
                id={name}
                type="number"
                disabled={disabled}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
              <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}>
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
