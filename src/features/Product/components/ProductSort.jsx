import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
    const handleSortChange = (e, newValue) => {
        onChange(e, newValue)
    }
    return (
        <Tabs
        value={currentSort}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleSortChange}
        aria-label="disabled tabs example"
        >
            <Tab label="Từ cao xuống thấp" value="salePrice:DESC"/>
            <Tab label="Từ thấp lên cao" value="salePrice:ASC" />
        </Tabs>
    );
}

export default ProductSort;