import React, { useState, useEffect } from "react";
import jsonData from "../constants/Data.json";
import "../styles/style.css";
import Select from "react-select";

const AutoComplete = () => {
  let [inputValue, setInputValue] = useState("");
  let [cartItems, setCartItems] = useState([]);
  let [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setInputValue("");
    setSelectedOption(null);
  }, [cartItems]);

  // Function to handle adding an item to the cart
  const handleAddToCart = (inputValue) => {
    const author = jsonData.authors.find(
      (el) => el.book_id === inputValue.id
    )?.author;
    let titles = jsonData.titles[inputValue.id];

    let newItem = {
      author: author,
      titles: titles,
      summaries: inputValue.label,
    };

    setCartItems((prevItems) => [...prevItems, newItem]);

    // Remove the selected item from JSON data
    jsonData.authors = jsonData?.authors.filter(
      (el) => el?.book_id !== inputValue?.id
    );
    jsonData.titles = jsonData?.titles.filter(
      (el, index) => index !== inputValue?.id
    );
    jsonData.summaries = jsonData?.summaries.filter(
      (el) => el.id !== inputValue?.id
    );
  };

  // Function to get filtered options based on input value
  const getFilteredOptions = () => {
    let options = jsonData?.summaries
      .map((el) => ({
        id: el?.id,
        label: el?.summary,
      }))
      .filter((el) =>
        el?.label?.toLowerCase().includes(inputValue.toLowerCase())
      )
      .sort((a, b) => {
        let countA = (
          a?.label
            .toLowerCase()
            .match(new RegExp(inputValue.toLowerCase(), "g")) || []
        ).length;
        let countB = (
          b?.label
            .toLowerCase()
            .match(new RegExp(inputValue.toLowerCase(), "g")) || []
        ).length;
        return countB - countA;
      });
    return options;
  };

  return (
    <div className="p-5">
      <div className="flex pb-8">
        <Select
          options={getFilteredOptions()}
          placeholder="Select an option"
          className="w-1/2 pr-4"
          isClearable={true}
          onInputChange={(inputValue) => setInputValue(inputValue)}
          inputValue={inputValue}
          value={selectedOption}
          onChange={(selectedOption) => setSelectedOption(selectedOption)}
        />
        <button
          onClick={() => handleAddToCart(selectedOption)}
          className="border border-gray-800 rounded-md p-1 bg-slate-700 text-white"
        >
          Add To Cart
        </button>
      </div>
      {/* Display the items in the cart */}
      <div className="grid grid-cols-4 gap-4">
        {cartItems.map((el, i) => (
          <div
            key={i}
            className="border border-gray-900 rounded-md p-2 bg-slate-700 text-gray-200 transition-transform transform hover:scale-105"
          >
            <div>
              {" "}
              <span className="text-white font-bold">Author: </span>
              {el.author}
            </div>
            <div>
              <span className="text-white  font-bold">Title: </span>
              {el.titles}
            </div>
            <div>
              <span className="text-white  font-bold">Summary: </span>
              {el.summaries}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoComplete;
