import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import users from "./users.json";
import "./App.css";

const App = () => {
  const [celebrities, setCelebrities] = useState([]);
  const [updatedCelebs, setUpdatedCelebs] = useState(null);

  useEffect(() => {
    if (updatedCelebs) {
      setCelebrities(updatedCelebs);
    } else {
      // Calculate age for each user
      const currentDate = new Date();
      const updatedUsers = users.map((user) => {
        const birthDate = new Date(user.dob);
        const age = Math.floor(
          (currentDate - birthDate) / (1000 * 60 * 60 * 24 * 365)
        );
        return { ...user, age };
      });
      setCelebrities(updatedUsers);
    }
  }, [updatedCelebs]);

  function updateCelebrities(editedUser, updateDeleted) {
    if (updateDeleted) {
      const updatedList = celebrities.filter((user) => user !== editedUser);
      setUpdatedCelebs(updatedList);
    } else {
      const updatedList = celebrities.map((user) => {
        if (user.id === editedUser.id) {
          return { ...user, ...editedUser };
        }
        return user;
      });
      setUpdatedCelebs(updatedList);
    }
  }

  return (
    <div className="container">
      <h1 className="text-start">Famous Celebrities</h1>
      <UserList
        celebrities={celebrities}
        updateCelebrities={updateCelebrities}
      />
    </div>
  );
};

export default App;
