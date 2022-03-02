import React from 'react';
import PropTypes from 'prop-types';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Box, Icon, makeStyles, Typography } from '@material-ui/core';
import { ThemeConsumer } from 'styled-components';

NotFound.propTypes = {
    
};
const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(15),
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: '100px',
        marginTop: theme.spacing(2)
    },
    errorIcon: {
        fontSize: '100px',
    }
}))

function NotFound(props) {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            
            <ErrorOutlineIcon className={classes.errorIcon} />
           <Typography className={classes.title}>PAGE NOT FOUND</Typography>
        </Box>
    );
}

export default NotFound;