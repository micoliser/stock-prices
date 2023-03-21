import React from "react";
import Data from "./Data";
import { Roller } from "react-awesome-spinners";

function Dashboard({ stocks }) {
  return (
    <div className="dashboard">
      {stocks.length === 0 ? (
        <div className="loading">
          <h3>Fetching stock data... Hang tight</h3>
          <Roller color={"black"} size={30} sizeUnits={"px"} />
        </div>
      ) : (
        <div className="stock-table">
          <p>
            Refresh page to get latest stock data or search for a particular
            stock (or comma seperated stocks) with symbol
          </p>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Stock Name</th>
                <th>Current Price</th>
                <th>Change</th>
                <th>% Change</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map(
                (
                  {
                    stockSymbol,
                    stockName,
                    currentPrice,
                    changeInPrice,
                    changePercent,
                  },
                  index
                ) => {
                  return (
                    <Data
                      key={index}
                      sym={stockSymbol}
                      name={stockName}
                      price={currentPrice}
                      change={changeInPrice}
                      changePer={changePercent}
                    />
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
