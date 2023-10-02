import React, { useState, useEffect } from "react";
import "./App.css";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const UserList = ({ celebrities, updateCelebrities }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [warning, setWarning] = useState(null);

  const handleAccordionClick = (user) => {
    if (editMode) return;

    if (selectedUser === user) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
      setEditMode(false);
      setEditedUser(null);
    }
  };

  const handleEditClick = (user) => {
    if (user.age >= 18) {
      setEditMode(true);
      setEditedUser(user);
    }
  };

  const handleDeleteClick = (deleteUser) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      // Delete user logic
      updateCelebrities(deleteUser, true);
    }
  };

  const handleSaveClick = (editedUser) => {
    // Save user logic
    if (!editedUser.country) {
      return setWarning(
        "Field cannot be empty Either add value or cancel edit."
      );
    }
    if (!editedUser.description) {
      return setWarning(
        "Field cannot be empty Either add value or cancel edit."
      );
    }
    if (editedUser.age < 1) {
      return setWarning(
        "Field cannot be 0 or Empty Either add value or cancel edit"
      );
    }

    updateCelebrities(editedUser, false);
    setEditMode(false);
    setEditedUser(null);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    let temp = celebrities.filter((person) => {
      let completeDataOfUser = JSON.stringify(person);
      return completeDataOfUser.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredItems(temp);
  }, [search, celebrities, editedUser]);

  return (
    <div className="container">
      <div className="serarchArea">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search user"
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>
      </div>
      {filteredItems.map((user) => (
        <div
          className="accordion my-4 border p-2"
          key={user.id}
          style={{ borderRadius: "15px" }}
        >
          <div
            className={`accordion-header ${
              selectedUser && selectedUser.id === user.id ? "active" : ""
            } `}
            onClick={() => handleAccordionClick(user)}
          >
            <div
              className="userTitle"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="profile d-flex">
                <img
                  src={user.picture}
                  alt=""
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    margin: "0 20px",
                  }}
                />
                <h3
                  className={`mb-0 ${
                    editedUser === user ? "border p-2 bdr-13" : ""
                  }`}
                >
                  {user.first} {user.last}
                </h3>
              </div>
              <button className="btn btn-link" type="button">
                {selectedUser && selectedUser.id === user.id ? "-" : "+"}
              </button>
            </div>
          </div>
          {selectedUser && selectedUser.id === user.id && (
            <div className="accordion-body p-4">
              {!editMode ? (
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="age">
                      <p className="text-secondary">Age</p>
                      <p>{user.age} Years</p>
                    </div>
                    <div className="gender">
                      <p className="text-secondary">Gender</p>
                      <p>{user.gender}</p>
                    </div>
                    <div className="country">
                      <p className="text-secondary">Country</p>
                      <p>{user.country}</p>
                    </div>
                  </div>
                  <p className="text-secondary">Description</p>
                  <p className="p-2">{user.description}</p>

                  <EditOutlinedIcon
                    className="text-primary icon"
                    onClick={() => handleEditClick(user)}
                    style={{ float: "right" }}
                  />
                  <DeleteOutlineSharpIcon
                    className="text-danger ml-2 icon"
                    onClick={() => handleDeleteClick(user)}
                    style={{ float: "right" }}
                  />
                </div>
              ) : (
                <div>
                  <div
                    className="userTitle"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="form-group">
                      <label htmlFor="age" className="text-secondary">
                        Age
                      </label>
                      <input
                        type="numbers"
                        className="form-control bdr-13"
                        id="country"
                        name="age"
                        value={editedUser.age}
                        onChange={handleInputChange}
                      />
                      <p className="text-danger">
                        {!editedUser.age || editedUser.age < 1
                          ? " * " + warning
                          : ""}
                      </p>
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender" className="text-secondary">
                        Gender
                      </label>
                      <select
                        className="form-control bdr-13"
                        id="gender"
                        name="gender"
                        value={editedUser.gender}
                        onChange={handleInputChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                        <option value="Rather not say">Rather not say</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="country" className="text-secondary">
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control bdr-13"
                        id="country"
                        name="country"
                        value={editedUser.country}
                        onChange={handleInputChange}
                      />
                      <p className="text-danger">
                        {!editedUser.country ? " * " + warning : ""}
                      </p>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description" className="text-secondary">
                      Description
                    </label>
                    <textarea
                      className="form-control bdr-13"
                      style={{ height: "15vh" }}
                      id="description"
                      name="description"
                      value={editedUser.description}
                      onChange={handleInputChange}
                    ></textarea>
                    <p className="text-danger">
                      {!editedUser.description ? " * " + warning : ""}
                    </p>
                  </div>

                  <CheckCircleOutlineOutlinedIcon
                    className={`text-success  ml-2 icon floatRight ${
                      Object.is(user, editedUser) ? "opacity30" : ""
                    }`}
                    onClick={() =>
                      !Object.is(user, editedUser) &&
                      handleSaveClick(editedUser)
                    }
                  />

                  <CancelOutlinedIcon
                    className="text-danger ml-2 icon floatRight"
                    onClick={handleCancelClick}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserList;
