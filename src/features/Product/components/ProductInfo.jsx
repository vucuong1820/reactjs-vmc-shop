import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { formatPrice } from '../../../utils';

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 0, 2, 0),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  name: {
    textTransform: 'uppercase'
  },
  description: {
    margin: theme.spacing(2, 0),
  },
  priceBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  salePrice: {
    marginRight: theme.spacing(3),
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
  },
  originalPrice: {
    marginRight: theme.spacing(2),
    textDecoration: 'line-through',
  },
}));

function ProductInfo({ product }) {
  const classes = useStyles();
  const { description, shortDescription, name, originalPrice, salePrice, promotionPercent } = product;
  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4" className={classes.name}>
        {name}
      </Typography>

      <Typography variant="body2" className={classes.description}>
        {shortDescription}
      </Typography>

      <Box className={classes.priceBox}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>
            <Box component="span" className={classes.promotionPercent}>
              {`-${promotionPercent}%`}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
