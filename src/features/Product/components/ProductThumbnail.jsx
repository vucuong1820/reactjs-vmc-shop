import React from 'react';
import PropTypes from 'prop-types';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants/index';
import { makeStyles } from '@material-ui/core';
import ReactImageZoom from 'react-image-zoom';

ProductThumbnail.propTypes = {
  product: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {
      '&:hover':{
          cursor: 'pointer'
      }
  },
}));
function ProductThumbnail({ product }) {
    const classes = useStyles()
  const thumbnailUrl = product.thumbnail?.url ? `${STATIC_HOST}${product.thumbnail.url}` : THUMBNAIL_PLACEHOLDER;
  const propsImage = { 
      width: 375, 
      height: 375, 
      zoomWidth: 500, 
      img: thumbnailUrl, 
      scale: 0.5, 
      zoomPosition: 'left',
      offset: {"vertical": 100, "horizontal": 10}
     };
  return (
    <div className={classes.root}>
      <ReactImageZoom {...propsImage} />
    </div>
  );
}

export default ProductThumbnail;
