import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import PaymentForm from './PaymentForm';

ConfirmDialog.propTypes = {
    
};

function ConfirmDialog({open, handleClose}) {
    return (
        <Dialog
        open={open}
        onClose={handleClose}

        >
            <DialogTitle id="alert-dialog-title">Xác nhận thông tin thanh toán</DialogTitle>
            <DialogContent>
                <PaymentForm />
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmDialog;