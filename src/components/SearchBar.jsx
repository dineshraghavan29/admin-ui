import React, { useEffect } from "react";
import Properties from "../utils/Properties";

export default function SearchBar(props) {
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
      placeholder={Properties.search_placeholder}
      onChange={(e) => filterData(e.target.value)}
      disabled={data.length === 0}
    />
  );
}
