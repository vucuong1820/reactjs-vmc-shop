import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

ProductFeature.propTypes = {
    
};

function ProductFeature(props) {
    const match = useRouteMatch()
    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} exact component={ListPage}/>
                <Route path={`${match.url}/:productId`} component={DetailPage}/>
            </Switch>
        </Box>
    );
}

export default ProductFeature;