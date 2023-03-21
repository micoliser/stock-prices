import React from "react";
import SearchOption from "./SearchOption";

function SearchBar({ symbols, searching, change, search, fillSearch, value }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for stocks"
        onChange={(e) => {
          return change(e);
        }}
        value={value}
      />
      <button
        onClick={(e) => {
          return search(e);
        }}
      >
        Search
      </button>
      <div className={searching ? "search-option" : ""}>
        {searching &&
          symbols
            .filter((symbol) => symbol.startsWith(value.toUpperCase()))
            .slice(0, 50)
            .map((symbol, index) => {
              return (
                <SearchOption click={fillSearch} key={index} sym={symbol} />
              );
            })}
      </div>
    </div>
  );
}

export default SearchBar;
