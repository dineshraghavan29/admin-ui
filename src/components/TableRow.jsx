import React, { useState } from "react";

const classes = {
  editIcon: {
    fontSize: 20,
    color: "#8a82f7",
    paddingRight: 20,
    cursor: "pointer",
  },
  deleteIcon: {
    fontSize: 20,
    color: "#de425b",
    cursor: "pointer",
  },
};

function TableRow(props) {
  const {
    rec,
    tableData,
    setTableData,
    selectedRows,
    setSelectedRows,
    deleteHandler,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const [currentRec, setCurrentRec] = useState({
    name: rec.name,
    email: rec.email,
    role: rec.role,
  });
  const isSelected = selectedRows.indexOf(rec.id) !== -1;

  function toggleSelect() {
    if (selectedRows.indexOf(rec.id) === -1)
      setSelectedRows([...selectedRows, rec.id]);
    else setSelectedRows(selectedRows.filter((element) => element !== rec.id));
  }

  function getCheckbox() {
    return (
      <>
        <input
          type="checkbox"
          id={rec.id}
          name={rec.id}
          value={rec.id}
          checked={isSelected}
          style={{ cursor: "pointer" }}
          onChange={() => toggleSelect()}
        />
        <label htmlFor={rec.id} />
      </>
    );
  }

  function updateTableData() {
    const tempTableData = JSON.parse(JSON.stringify(tableData.data));
    const index = tempTableData.findIndex((data) => data.id === rec.id);

    tempTableData[index]["name"] = currentRec.name;
    tempTableData[index]["email"] = currentRec.email;
    tempTableData[index]["role"] = currentRec.role;
    setTableData({ error: "", data: tempTableData });
  }

  function updateEditRow(name, value) {
    let tempParams = { ...currentRec };
    tempParams[name] = value;

    setCurrentRec(tempParams);
  }

  function getInput(label) {
    return (
      <input
        type="text"
        className="edit-input"
        value={currentRec[label]}
        onChange={(e) => updateEditRow(label, e.target.value)}
      />
    );
  }

  function getSelectInput(label) {
    return (
      <select
        name="role"
        id="role"
        className="edit-input"
        value={currentRec[label]}
        onChange={(e) => updateEditRow(label, e.target.value)}
      >
        <option value="member">member</option>
        <option value="admin">admin</option>
      </select>
    );
  }

  function getEditRow() {
    return (
      <tr className={isSelected ? "selected" : ""}>
        <td style={{ textAlign: "center" }}>{getCheckbox()}</td>
        <td>{getInput("name")}</td>
        <td>{getInput("email")}</td>
        <td>{getSelectInput("role")}</td>
        <td>
          <i
            className="fa-solid fa-floppy-disk"
            style={classes.editIcon}
            onClick={() => {
              updateTableData();
              setEditMode(false);
            }}
          ></i>
          <i
            className="fa-solid fa-trash-can"
            style={classes.deleteIcon}
            onClick={() => deleteHandler(rec.id)}
          ></i>
        </td>
      </tr>
    );
  }

  function getRow() {
    return (
      <tr className={isSelected ? "selected" : ""}>
        <td style={{ textAlign: "center" }}>{getCheckbox()}</td>
        <td>{rec.name}</td>
        <td>{rec.email}</td>
        <td>{rec.role}</td>
        <td>
          <i
            className="fa-solid fa-pen-to-square"
            style={classes.editIcon}
            onClick={() => setEditMode(true)}
          ></i>
          <i
            className="fa-solid fa-trash-can"
            style={classes.deleteIcon}
            onClick={() => deleteHandler(rec.id)}
          ></i>
        </td>
      </tr>
    );
  }

  return <>{editMode ? getEditRow() : getRow()}</>;
}

export default TableRow;
