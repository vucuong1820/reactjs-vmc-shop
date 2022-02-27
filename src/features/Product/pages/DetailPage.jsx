import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { addToCart } from '../../Cart/cartSlice';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3)
  },

  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[150]}`,
  },

  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },

  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

function DetailPage(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const match = useRouteMatch();
  const productId = match.params.productId;

  const { product, loading } = useProductDetail(productId);
  const handleAddToCart = ({ quantity }) => {
    const action = addToCart({
      id: productId,
      product,
      quantity
    })
    dispatch(action)
    
  };
  if (loading) {
    return (
      <Box>
        <LinearProgress className={classes.loading} />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>

            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCart} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
        <Switch>
          <Route path={match.url} exact>
            <ProductDescription product={product} />
          </Route>

          <Route path={`${match.url}/additional`} exact>
            <ProductAdditional />
          </Route>

          <Route path={`${match.url}/reviews`} exact>
            <ProductReviews />
          </Route>
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
