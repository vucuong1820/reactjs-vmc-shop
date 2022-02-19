import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants/index';

Product.propTypes = {
  product: PropTypes.object,
};

Product.defaultProps = {
  product: {},
};

function Product({ product }) {
  const thumbnailUrl = product.thumbnail?.url ? `${STATIC_HOST}${product.thumbnail.url}` : THUMBNAIL_PLACEHOLDER;
  const { name, salePrice, promotionPercent } = product;
  return (
    <Box padding={1}>
      <Box padding={1}>
        <img src={thumbnailUrl} width="100%" alt={product.name} />
      </Box>
      <Typography>{name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" mr={2}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salePrice)}
        </Box>
        {promotionPercent > 0 ? `-${promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default Product;
