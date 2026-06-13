import React from "react";

function Search({ setSearch }) {
  return (
    <div className="ui large fluid icon input">
      {/* Updates the search state as the user types. */}
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={(e) => setSearch(e.target.value)}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
