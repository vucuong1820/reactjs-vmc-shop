import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import ProductList from '../components/ProductList';
import ProductSkeleton from '../components/ProductSkeleton';

ListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },
}));
function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getAll({ _page: 1, _limit: 10 });
        console.log('response: ', response);
        setProductList(response.data);
        setLoading(false)
      } catch (error) {
        console.log('Failed to fetch product api:', error);
      }
    })();
  }, []);
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Left</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>{loading ? <ProductSkeleton /> : <ProductList data={productList}/>}</Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
