import React, { useState } from 'react';
import IProps from 'prop-types';
import { Button } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import useStyles from './Style';

const SearchBar = ({ placeholder, fontWeight, onSearch }: any) => {
  const classes = useStyles();
  const [text, SetText] = useState({
    value: '',
  });

  const handleOnChange = (e: any) => {
    e.persist();
    SetText((prevState) => {
      return { ...prevState, value: e.target.value };
    });
  };

  const onSubmitEvent = async (e: any) => {
    e.preventDefault();
    // Following statements passed textValue for searching the data
    await onSearch(text.value);
    SetText((prevState) => {
      return { ...prevState, value: '' };
    });
  };

  return (
    <form onSubmit={(e) => onSubmitEvent(e)} className={classes.root}>
      <input
        className={classes.inputBox}
        style={{ fontWeight }}
        value={text.value}
        onChange={handleOnChange}
        type='search'
        required
        placeholder={placeholder}
      />
      <Button type='submit' className={classes.SearchBox}>
        <SearchIcon className={classes.SearchIcon} />
      </Button>
    </form>
  );
};

SearchBar.propTypes = {
  placeholder: IProps.string,
  fontWeight: IProps.string,
  onSearch: IProps.func,
};

export default SearchBar;
