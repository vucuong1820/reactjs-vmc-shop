import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import ProductList from '../components/ProductList';
import ProductSkeleton from '../components/ProductSkeleton';
import ProductSort from '../components/ProductSort';

ListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '20px'
  }
}));
function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 9,
    page: 1,
    total: 9,
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 9,
    _sort: 'salePrice:ASC'
  });
  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getAll(filters);
        setProductList(response.data);
        setPagination(response.pagination);

        setLoading(false);
      } catch (error) {
        console.log('Failed to fetch product api:', error);
      }
    })();
  }, [filters]);
  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }));
  };
  const handleSortChange = (e, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _sort: newValue,
    }));
  }
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Left</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={filters._sort} onChange={handleSortChange}/>
              {loading ? <ProductSkeleton length={9} /> : <ProductList data={productList} />}
              <Box className={classes.pagination}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={filters._page}
                  color="primary"
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
