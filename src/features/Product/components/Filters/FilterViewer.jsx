import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        padding: 0,

        margin: theme.spacing(2,0),
        listStyleType: 'none',

        '& > li': {
            margin: 0,
            padding: theme.spacing(1)
        }
    },
}));
const FILTER_LIST = [
    {
        id: 1,
        getLabel: (filters) => 'Miễn phí giao hàng',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: (filters) => {},
        onToggle: (filters) => {
            const newFilters = {...filters}
            if(newFilters.isFreeShip){
                delete newFilters.isFreeShip
            } else {
                newFilters.isFreeShip = true;
            }

            return newFilters
        }
    },
    {
        id: 2,
        getLabel: (filters) => `Giá từ ${new Intl.NumberFormat('vi-VN').format(filters.salePrice_gte)} đến ${new Intl.NumberFormat('vi-VN').format(filters.salePrice_lte)}`,
        isActive: () => true,
        isVisible: (filters) => Number.parseInt(filters.salePrice_gte) > 0 && Number.parseInt(filters.salePrice_lte) > 0 ,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters}
            if(newFilters.salePrice_gte && newFilters.salePrice_lte ) {
                delete newFilters.salePrice_gte
                delete newFilters.salePrice_lte
            }
            return newFilters
        },
        onToggle: (filters) => {}
    },
    {
        id: 3,
        getLabel: (filters) => 'Có khuyến mãi',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters}
            if(newFilters.isPromotion) delete newFilters.isPromotion
            return newFilters
        },
        onToggle: (filters) => {}
    },
    {
        id: 4,
        getLabel: (filters) => `${filters["category.name"]}`,
        isActive: () => true,
        isVisible: (filters) => filters["category.name"],
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters}
            if(newFilters["category.name"]) delete newFilters["category.name"]

            return newFilters
        },
        onToggle: (filters) => {}
    }
]



FilterViewer.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
};

function FilterViewer({ filters = {}, onChange = null}) {
    const classes = useStyles();
    const currenFilters = useMemo(() => {
        return FILTER_LIST.filter(x => x.isVisible(filters))
    }, [filters])
    return (
        <Box component="ul" className={classes.root}>
            {
                currenFilters.map(x => (
                    <li key={x.id}>
                        <Chip
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default' }
                        clickable={!x.isRemovable}
                        onClick={x.isRemovable ? null : () => {
                            const newFilters = x.onToggle(filters)
                            if(onChange) onChange(newFilters)
                        }}
                        onDelete={x.isRemovable ? () => {
                            const newFilters = x.onRemove(filters)
                            if(onChange) onChange(newFilters)
                        } : null}
                        />
                    </li>
                ))
            }
        </Box>
    );
}

export default FilterViewer;