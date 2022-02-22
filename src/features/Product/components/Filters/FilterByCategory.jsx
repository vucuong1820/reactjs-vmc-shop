import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from '../../../../api/categoryApi';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    },
    menu: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
        '& > li': {
            marginTop: theme.spacing(1),

            '&:hover': {
                color: theme.palette.primary.dark,
                cursor: 'pointer',
            }
        }
    }
}))

function FilterByCategory({ onChange }) {
    const classes = useStyles()
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await categoryApi.getAll();
                setCategoryList(response.map(x => ({
                    id: x.id,
                    name: x.name,
                })))
            } catch (error) {
                console.log('Failed to fetch category api: ',error);
            }

        })()
    },[]);

    const handleCategoryClick = (newCategoryId) => {
        if(!onChange) return;
        onChange(newCategoryId)
    }
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">
                DANH MỤC SẢN PHẨM
            </Typography>
            <ul className={classes.menu}>
                {
                    categoryList.map(category => (
                        <li key={category.id} onClick={() => handleCategoryClick(category.id)}>
                            <Typography variant="body2">{category.name}</Typography>
                        </li>
                    ))
                }
            </ul>
        </Box>
    );
}

export default FilterByCategory;