import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchValue, setSearchValue] = useState('');

    const updateSearchValue = (value) => {
        setSearchValue(value);
    };

    return (
        <SearchContext.Provider value={{ searchValue, updateSearchValue }}>
            {children}
        </SearchContext.Provider>
    );
};
