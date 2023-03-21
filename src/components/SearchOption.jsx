import React from "react";

function SearchOption({ click, sym }) {
  return (
    <p
      onClick={(e) => {
        return click(e);
      }}
    >
      {sym}
    </p>
  );
}

export default SearchOption;
