import React from "react";

function Result({
  sym,
  name,
  price,
  change,
  changePer,
  clickFunc,
  searchValue,
}) {
  return (
    <div className="stock-result">
      {sym !== undefined ? (
        <div>
          <h3>Stock data for {sym}</h3>
          <p>
            <span className="stock-data">Stock Symbol</span>: {sym}
          </p>
          <p>
            <span className="stock-data">Stock Name</span>: {name}
          </p>
          <p>
            <span className="stock-data">Current Price</span>: {price}
          </p>
          <p>
            <span className="stock-data">Change in price</span>: {change}
          </p>
          <p>
            <span className="stock-data">Change Percent</span>: {changePer}
          </p>
        </div>
      ) : (
        <div>
          <h3>No result found for stock {searchValue}</h3>
        </div>
      )}
      <button
        onClick={() => {
          return clickFunc();
        }}
      >
        Go Back
      </button>
    </div>
  );
}

export default Result;
