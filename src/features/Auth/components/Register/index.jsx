import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar()

    const handleSubmit = async (values) => {
        try {
            //auto set username = email
            values.username = values.email;

            const action = register(values);
            const resultAction = await dispatch(action);
            
            // unwrapResult(toolkit) to get the result of action object (is fulfilled or rejected?)
            const user = unwrapResult(resultAction)
            console.log('new user: ',user);

            // show message 
            enqueueSnackbar('Register successfully', {variant: 'success',autoHideDuration: 3000})

            // close dialog
            const {closeDialog} = props;
            if(closeDialog) closeDialog();

        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error', autoHideDuration: 3000})
        }
    }
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;