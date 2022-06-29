import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { getMembers } from "../services/adminService";

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
    center: {
      textAlign: "center",
    },
    headerContainer: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    deleteWrapper: {
      width: "20%",
    },
    searchWrapper: {
      width: "80%",
    },
  };
};

function AdminPanel() {
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
    getMembers()
      .then((response) => {
        setTableData({ error: "", data: JSON.parse(response) });
      })
      .catch((message) => {
        setTableData({ error: message, data: [] });
      });
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
        Delete Selected
      </button>
    );
  }

  return (
    <div style={classes.center}>
      <div style={classes.container}>
        <div style={classes.headerContainer}>
          <div style={classes.deleteWrapper}>{getDeleteButton()}</div>
          <div style={classes.searchWrapper}>
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

export default AdminPanel;
