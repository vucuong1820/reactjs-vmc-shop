import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

SearchBox.propTypes = {
    handleSearch: PropTypes.func,
};

SearchBox.defaultProps = {
    handleSearch: null,
};

function SearchBox(props) {
    const { handleSearch } = props;
    const [searchTerm , setSearchTerm] = useState('')
    const debounceSearchInput = useRef(null);

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchTerm(value)
        if(!handleSearch) return;

        if(debounceSearchInput.current){
            clearTimeout(debounceSearchInput.current)
        };

        debounceSearchInput.current = setTimeout(() => {
            const formValues = {
                searchTerm: value,
            }
            handleSearch(formValues)

        },500)
    }
    return (
        <form>
            <input 
            type="text"
            value={searchTerm}
            onChange={handleSearchInput} 
             />
        </form>
    );
}

export default SearchBox;
//t