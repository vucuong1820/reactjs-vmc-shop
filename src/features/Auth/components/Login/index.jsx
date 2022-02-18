import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice';
import LoginForm from '../LoginForm';

Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar()

    const handleSubmit = async (values) => {
        try {

            const action = login(values);
            const resultAction = await dispatch(action);
            
            // unwrapResult(toolkit) to get the result of action object (is fulfilled or rejected?)
            const user = unwrapResult(resultAction)
            console.log('login user: ',user);

            // close dialog
            const {closeDialog} = props;
            if(closeDialog) closeDialog();

        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error'})
        }
    }
    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;