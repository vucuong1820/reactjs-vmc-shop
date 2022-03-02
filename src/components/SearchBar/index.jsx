import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, InputBase, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import queryString from "query-string"
SearchBar.propTypes = {
    
};
const useStyles = makeStyles(theme => ({
    root: {
        display:'flex',
        flexFlow: 'row nowrap',
        flexGrow: 1,
    },
    searchIcon: {
        color: 'inherit',
        width: '50px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      searchInput: {
        color:'inherit',
        flexGrow: 1,
        padding: theme.spacing(0.5, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '500px',
      },
}))
function SearchBar(props) {
    const history = useHistory()
    const classes = useStyles()
    const [value, setValue] = useState('')
    const currentSearchParams = queryString.parse(history.location.search)
    const handleSubmit = (e) =>{
        e.preventDefault();
        const newSearchParams = {
            ...currentSearchParams,
            _page: 1,
            name_contains: value,
          };
        history.push({
            pathname: "/search",
            search: queryString.stringify(newSearchParams)
        })
        setValue('')
    }
    return (
        <form  onSubmit={(e) => handleSubmit(e)} className={classes.root}>
            <IconButton className={classes.searchIcon}>
                <SearchIcon/>
            </IconButton>
            <InputBase placeholder="Seach..." className={classes.searchInput} value={value} onChange={e => setValue(e.target.value)}/>   
        </form>
    );
}

export default SearchBar;
