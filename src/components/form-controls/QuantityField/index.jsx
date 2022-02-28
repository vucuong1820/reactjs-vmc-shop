import { Box, FormHelperText, makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setQuantity } from '../../../features/Cart/cartSlice';
import {useSnackbar} from "notistack"
QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  item: PropTypes.object,
  onDelete: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {},
  label: {},

  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '160px',
  },
}));
function QuantityField(props) {
  const {enqueueSnackbar} = useSnackbar()
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { form, name, label, disabled, onChange, item, onDelete } = props;
  const { errors, setValue, getValues } = form;
  const hasError = errors[name];

  const handleClose = () => {
    setOpen(false);
    setValue(name, Number.parseInt(item.quantity) ? Number.parseInt(item.quantity) + 1 : 1)
    dispatch(setQuantity({
      id: item.id,
      quantity: 1,
    }));

  };

  const handleIncrease = (value) => {
    if (item) {
      setValue(name, Number.parseInt(item.quantity) ? Number.parseInt(item.quantity) + 1 : 1);
    } else {
      setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1);
    }
    if (onChange) onChange(getValues());
  };
  const handleDecrease = (value) => {
    if (item) {
      setValue(name, Number.parseInt(item.quantity) ? Number.parseInt(item.quantity) - 1 : 1);
      const valueQty = Number.parseInt(getValues().quantity);
      if (valueQty === 0 && onDelete) {
        setOpen(true);
      }
    } else {
      setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1);
    }
    if (onChange) onChange(getValues());
  };

  const handleConfirmDelete = () => {
      onDelete(item)
      setOpen(false)
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
              <IconButton onClick={(e) => handleDecrease(e)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
              <OutlinedInput
                id={name}
                type="number"
                disabled={disabled}
                name={name}
                value={value}
                onChange={(e) => {
                  onChange();
                  if(Number.parseInt(e.target.value) <= 0){
                    enqueueSnackbar('Số lượng tối thiểu là 1',{variant:'warning'})
                  }
                  const action = setQuantity({
                    id: item.id,
                    quantity: Number.parseInt(e.target.value),
                  });
                  dispatch(action);
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
      {/* CONFIRM DIALOG */}
      <Dialog
        open={open}
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
          <Button onClick={handleClose} color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={handleConfirmDelete } color="primary" autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default QuantityField;
