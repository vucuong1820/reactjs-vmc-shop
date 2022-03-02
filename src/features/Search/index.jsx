import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import productApi from '../../api/productApi';
import ProductList from '../Product/components/ProductList';
import ProductSkeleton from '../Product/components/ProductSkeleton';
Search.propTypes = {};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3,0)
    },
    content: {
      flex: '1 1 0'
    },
    title: {
        paddingTop: theme.spacing(2),
        fontWeight: 'bold',
        fontSize: '28px'

    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
      paddingBottom: '20px',
    },
}))
function Search(props) {
  const classes = useStyles();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 12,
    page: 1,
    total: 9,
  });

  const history = useHistory();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: 12,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getAll(queryParams);
        setProductList(response.data);
        setPagination(response.pagination);
        setLoading(false);

      } catch (error) {
        console.log('error:', error);
      }
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.content}>
            <Paper elevation={0}>
              <Typography className={classes.title}>Kết quả tìm kiếm cho: {queryParams['name_contains']}</Typography>
              {loading ? <ProductSkeleton length={12} /> : <ProductList data={productList} />}
              <Box className={classes.pagination}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={queryParams._page}
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

export default Search;
