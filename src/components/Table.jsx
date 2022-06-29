import React from "react";
import TableRow from "./TableRow";

function Table(props) {
  const {
    loading,
    tableData,
    setTableData,
    paginatedData,
    selectedRows,
    setSelectedRows,
    deleteHandler,
  } = props;

  function toggleSelectAll(checked) {
    if (checked) {
      setSelectedRows(
        paginatedData.map((rec) => {
          return rec.id;
        })
      );
    } else {
      setSelectedRows([]);
    }
  }

  function getCheckbox() {
    let isChecked = true;
    const currentRows = paginatedData.map((rec) => {
      return rec.id;
    });
    if (currentRows.length === 0) isChecked = false;
    else {
      currentRows.forEach((rec) => {
        if (selectedRows.indexOf(rec) === -1) isChecked = false;
      });
    }

    return (
      <>
        <input
          type="checkbox"
          id="selectAll"
          name="vehicle1"
          value="selectAll"
          style={{ cursor: "pointer" }}
          checked={isChecked}
          onChange={(e) => toggleSelectAll(e.target.checked)}
        />
        <label htmlFor="selectAll" />
      </>
    );
  }

  function getTable() {
    return (
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>{getCheckbox()}</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((rec) => {
              return (
                <TableRow
                  key={rec.id}
                  rec={rec}
                  tableData={tableData}
                  setTableData={setTableData}
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                  deleteHandler={deleteHandler}
                />
              );
            })
          ) : (
            <tr>
              {
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No records found
                </td>
              }
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  function getTableHolder() {
    const { error } = tableData;

    if (loading) {
      //   return <LoadingIndicator />;
    } else if (error) {
      //   return <WidgetNoData message={error} />;
    } else {
      return <div className={"table-wrapper"}>{getTable()}</div>;
    }
  }

  return <>{getTableHolder()}</>;
}

export default Table;
