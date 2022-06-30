import React, { useState, useEffect } from "react";
import "../css/adminPanel.css";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { getUsers } from "../services/adminService";
import Properties from "../utils/Properties";

const makeStyles = () => {
  return {
    container: {
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "5% 5% 5%",
      borderRadius: 10,
      boxShadow: "0px 0px 20px #8a82f7",
    },
    headerContainer: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
  };
};

export default function AdminPanel() {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({ error: "", data: [] });
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const classes = makeStyles();

  useEffect(() => {
    getTableData();
  }, []);

  function getTableData() {
    setLoading(true);

    //Simulated loading
    setTimeout(() => {
      getUsers()
        .then((response) => {
          setLoading(false);
          setTableData({ error: "", data: JSON.parse(response) });
        })
        .catch((message) => {
          setLoading(false);
          setTableData({ error: message, data: [] });
        })
        .finally(() => setLoading(false));
    }, 2000);
  }

  function deleteData(id) {
    let result = [];

    if (id) {
      result = tableData.data.filter((rec) => {
        return rec.id !== id;
      });
      setSelectedRows(selectedRows.filter((rec) => rec !== id));
    } else {
      result = tableData.data.filter((rec) => {
        return selectedRows.indexOf(rec.id) === -1;
      });
      setSelectedRows([]);
    }
    setTableData({ error: "", data: result });
  }

  function getDeleteButton() {
    return (
      <button
        className="delete-button"
        disabled={selectedRows.length === 0}
        onClick={() => deleteData()}
      >
        {Properties.delete_selected}
      </button>
    );
  }

  return (
    <div className="center">
      <div style={classes.container}>
        <div style={classes.headerContainer}>
          <div className="delete-wrapper">{getDeleteButton()}</div>
          <div className="search-wrapper">
            <SearchBar
              data={tableData.data}
              setFilteredData={setFilteredData}
            />
          </div>
        </div>

        <Table
          loading={loading}
          tableData={tableData}
          setTableData={setTableData}
          paginatedData={paginatedData}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          deleteHandler={deleteData}
        />
        <Pagination data={filteredData} setPaginatedData={setPaginatedData} />
      </div>
    </div>
  );
}
