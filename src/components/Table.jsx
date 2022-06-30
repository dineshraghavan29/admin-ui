import React from "react";
import "../css/table.css";
import TableRow from "./TableRow";
import Loader from "./Loader";
import WidgetMessage from "./WidgetMessage";
import Properties from "./../utils/Properties";

export default function Table(props) {
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
    checked
      ? setSelectedRows(
          paginatedData.map((rec) => {
            return rec.id;
          })
        )
      : setSelectedRows([]);
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
          name="selectAll"
          className="defaultCheckbox cursor-pointer m-r-20"
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
            <th className="center">{getCheckbox()}</th>
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
                <td colSpan="5" className="center">
                  {Properties.no_record_found}
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
      return <Loader />;
    } else if (error) {
      return <WidgetMessage message={error} />;
    } else {
      return <div className={"table-wrapper"}>{getTable()}</div>;
    }
  }

  return <>{getTableHolder()}</>;
}
