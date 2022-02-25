import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },

  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
}));

function DetailPage(props) {
  const classes = useStyles();
  const match = useRouteMatch();
  const productId = match.params.productId;

  const { product, loading } = useProductDetail(productId);

  if (loading) {
    //MAKE IT BEAUTIFUL!
    return <Box>Loading</Box>;
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
              Product Info
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default DetailPage;
