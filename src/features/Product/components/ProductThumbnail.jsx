import React from 'react';
import PropTypes from 'prop-types';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants/index';

ProductThumbnail.propTypes = {
    product: PropTypes.object,
};

function ProductThumbnail({product}) {
  const thumbnailUrl = product.thumbnail?.url ? `${STATIC_HOST}${product.thumbnail.url}` : THUMBNAIL_PLACEHOLDER;
    
    return (
        <div>
            <img src={thumbnailUrl} width="100%" alt={product.name} />
        </div>
    );
}

export default ProductThumbnail;