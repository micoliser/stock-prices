import React from "react";
import SearchBar from "./Search";

function Header({ symbols, searching, change, search, fillSearch, value }) {
  return (
    <header>
      <h1>Atom8 Stocks</h1>
      <p>
        Get real time stock prices of any stock of your choice, fast and easy
      </p>
      <SearchBar
        symbols={symbols}
        searching={searching}
        change={change}
        search={search}
        fillSearch={fillSearch}
        value={value}
      />
    </header>
  );
}

export default Header;
