import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import productApi from '../../../api/productApi';
import ProductSkeleton from '../components/ProductSkeleton';

ListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 auto',
  },
}));
function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    (async () => {
      const response = await productApi.getAll({ _page: 1, _limit: 10 });
      console.log('response: ', response);

    //   setLoading(false)
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
            <Paper elevation={0}>
                {
                    loading ? <ProductSkeleton/> : <Typography>Product List</Typography>
                }
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
