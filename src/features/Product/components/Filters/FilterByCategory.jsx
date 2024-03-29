import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from '../../../../api/categoryApi';
import { Skeleton } from '@material-ui/lab';

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
    const [loading, setLoading] = useState(true)
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
                setLoading(false)

            } catch (error) {
                console.log('Failed to fetch category api: ',error);
            }

        })()
    },[]);
    const handleCategoryClick = (newCategoryId, newCategoryName) => {
        if(!onChange) return;
        onChange(newCategoryId, newCategoryName)
    }
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">
                DANH MỤC SẢN PHẨM
            </Typography>
            <ul className={classes.menu}>
                {
                    loading ? (
                        Array.from({length: 6}).map((x,i) => (
                            <li key={i}>
                                <Skeleton variant='text'/>
                            </li>
                        ))
                    ) : (
                        categoryList.map(category => (
                            <li key={category.id} onClick={() => handleCategoryClick(category.id, category.name)}>
                                        <Typography variant="body2">{category.name}</Typography>
                            </li>
                        ))
                    )
                    
                }
            </ul>
        </Box>
    );
}

export default FilterByCategory;