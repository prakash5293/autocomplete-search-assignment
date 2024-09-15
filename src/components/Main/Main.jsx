import React,{useState} from "react";

import List from "../List/List";
import SearchBar from "../SearchBar/SearchBar";
import CardList from "../CardList/CardList";

import './Main.css';

const Main = () => {
    const [searchedValue, setSearchedValue] = useState('');
    const [selectedValue, setSelectedValue] = useState([]);
    const [resetValue, setResetValue] = useState(false);

    const handleOnChange = (value) => {
        setSearchedValue(value);
        setResetValue(false);
    }

    const handleOnSelect = (selectedItem) => {
        setSelectedValue(selectedItem);
        setResetValue(true);

    }

  return (
    <div data-testid="main" className="main-wrapper">
        <SearchBar handleValue={handleOnChange} resetValue={resetValue}/>
        {searchedValue && <List searchedValue={searchedValue} selectedList={handleOnSelect} resetValue={resetValue}/>}
        {selectedValue && <CardList selectedTitle={selectedValue} />}
    </div>
  );
};

export default Main;