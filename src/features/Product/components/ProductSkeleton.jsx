import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
ProductSkeleton.propTypes = {
  length: PropTypes.number,
};

ProductSkeleton.defaultProps = {
  length: 6,
};

function ProductSkeleton({ length }) {
  return (
    <Box>
      <Grid container>
        {
          // create empty array with length from props
          Array.from({ length }).map((x, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}> 
                <Box padding={1}>
                    <Skeleton variant="rect" width="100%" height={200} />
                    <Skeleton />
                    <Skeleton width="60%" />
                </Box>
              </Grid> 
          ))
        }   
      </Grid>
    </Box>
  );
}

export default ProductSkeleton;
