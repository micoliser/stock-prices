import React, { useState, useEffect } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Result from "./Result";
import axios from "axios";

function App() {
  let [symbols, setSymbols] = useState([]);
  let [stocks, setStocks] = useState([]);
  let [searching, setSearch] = useState(false);
  let [searchValue, setSearchValue] = useState("");
  let [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    // get default starting data (symbols and stocks)
    const fetchData = async () => {
      const symbolsData = await axios.get(
        `https://api.iex.cloud/v1/data/CORE/REF_DATA?token=${process.env.REACT_APP_IEX_AUTH}`
      );
      let data = symbolsData.data.map((item) => item.symbol);
      setSymbols(data);

      // get first 100 stock data to initially populate dashboard with
      const stockData = await axios.get(
        `https://api.iex.cloud/v1/data/CORE/QUOTE/${data
          .slice(0, 100)
          .join()}?token=${process.env.REACT_APP_IEX_AUTH}`
      );

      setStocks(
        stockData.data.map((stock) => {
          return {
            stockSymbol: stock.symbol,
            stockName: stock.companyName,
            currentPrice: stock.latestPrice,
            changeInPrice: stock.change,
            changePercent: stock.changePercent,
          };
        })
      );
    };

    fetchData();
  }, []);

  function handleSearch(event) {
    setSearch(true);
    let value = event.target.value;
    setSearchValue(value);
  }

  function fillSearch(event) {
    let val = event.target.innerText;

    setSearchValue(val);
    setSearch(false);
  }

  const search = async (e) => {
    if (searchValue !== "") {
      // disable button to prevent multiple requests
      e.target.disabled = true;

      const result = await axios.get(
        `https://api.iex.cloud/v1/data/CORE/QUOTE/${searchValue.replace(
          /\s/g,
          ""
        )}?token=${process.env.REACT_APP_IEX_AUTH}`
      );

      setSearchResult(
        result.data.map((res, index) => {
          return {
            // searched value added for error handling when wrong stock data is searched
            searchedValue: searchValue.split(",")[index],
            stockSymbol: res.symbol,
            stockName: res.companyName,
            currentPrice: res.latestPrice,
            changeInPrice: res.change,
            changePercent: res.changePercent,
          };
        })
      );

      setSearch(false);
      setSearchValue("");
      // enable button
      e.target.disabled = false;
    }
  };

  function goBack() {
    setSearchResult([]);
  }

  return (
    <div>
      <Header
        symbols={symbols}
        searching={searching}
        change={handleSearch}
        search={search}
        fillSearch={fillSearch}
        value={searchValue}
      />
      {searchResult.length === 0 ? (
        <Dashboard stocks={stocks} />
      ) : (
        <div>
          {searchResult.map(
            (
              {
                stockSymbol,
                stockName,
                currentPrice,
                changeInPrice,
                changePercent,
                searchedValue,
              },
              index
            ) => {
              return (
                <Result
                  key={index}
                  sym={stockSymbol}
                  name={stockName}
                  price={currentPrice}
                  change={changeInPrice}
                  changePer={changePercent}
                  clickFunc={goBack}
                  searchValue={searchedValue}
                />
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default App;
