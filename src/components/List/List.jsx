import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getTitles, getSummaries } from "../../utils/utils";
import "./List.css";

const List = ({ searchedValue, selectedList, resetValue }) => {
  const [titles, setTitles] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if(searchedValue){
      const summaries = getSummaries();
      const filteredList = summaries
        .reduce((acc, item) => {
          const totalOccurrence = countOccurrence(
            item.summary.toLowerCase(),
            searchedValue.toLowerCase()
          );
          if (totalOccurrence > 0) {
            acc.push({ ...item, totalOccurrence });
          }
          return acc;
        }, [])
        .sort((a, b) => b.totalOccurrence - a.totalOccurrence);
      setFilteredItems(filteredList);
    }

  }, [searchedValue]);

  useEffect(() => {
    if (filteredItems.length > 0) {
      const filterTitles = filteredItems.map((item) => {
        return { id: item.id, titleName: getTitles(item.id) };
      });
      setTitles(filterTitles);
    }
  }, [filteredItems]);

  useEffect(() => {
    if (resetValue) {
      setFilteredItems([]);
      setTitles([]);
    }
  }, [resetValue]);

  const countOccurrence = (sentence, word) => {
    const count = sentence.match(new RegExp(`\\b${word}\\b`, "gi"));
    return count?.length > 0 ? count.length : 0;
  };

  return titles.length > 0 ? (
    <ul data-testid="search-list" className="search-list" style={{ listStyleType: "none", padding: "0" }}>
      {titles.map((title, index) => (
        <li
          data-testid="search-item"
          className="search-item"
          key={index}
          onClick={() => selectedList(title)}
        >
          <div>
            <h3>{title.titleName}</h3>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <></>
  );
};

List.defaultProps = {
  searchedValue: undefined,
  selectedList: () => {},
  resetValue: false,
};

List.propTypes = {
  searchedValue: PropTypes.string,
  selectedList: PropTypes.func,
  resetValue: PropTypes.bool,
};

export default List;
