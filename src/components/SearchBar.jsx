import React, { useEffect } from "react";

const classes = {
  searchBar: {
    width: "98%",
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
};

function SearchBar(props) {
  const { data, setFilteredData } = props;

  useEffect(() => {
    filterData();
  }, [data]);

  function filterData(searchBy) {
    let result = data;

    if (searchBy && searchBy.length >= 1) {
      result = result.filter((rec) => {
        const searchFor =
          rec["name"].toUpperCase() +
          rec["email"].toUpperCase() +
          rec["role"].toUpperCase();

        return searchFor.indexOf(searchBy.toUpperCase()) !== -1;
      });
    }

    setFilteredData(result);
  }

  return (
    <input
      type="text"
      className="search-input"
      style={classes.searchBar}
      placeholder="Search by name, email or role"
      onChange={(e) => filterData(e.target.value)}
    />
  );
}

export default SearchBar;
