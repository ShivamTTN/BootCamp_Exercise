import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const AddUser = (props) => {
  const [userId, setUserId] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const inputIdChangedhandler = (event) => {
    setUserId(event.target.value);
  };
  const inputFirstNameChangedhandler = (event) => {
    setUserFirstName(event.target.value);
  };
  const inputLastNameChangedhandler = (event) => {
    setUserLastName(event.target.value);
  };
  const inputEmailChangedhandler = (event) => {
    setUserEmail(event.target.value);
  };
  const submitFormHandler = (event) => {
    event.preventDefault();
    const userData = {
      id: userId,
      firstname: userFirstName,
      lastname: userLastName,
      email: userEmail,
    };
    console.log(userData);
    axios
      .post("http://localhost:8080/add-user" + JSON.stringify(userData))
      .then((res) => {
        console.log(res.data);
        return <Redirect to="/" />;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={(event) => submitFormHandler(event)}>
      <div>
        ID :
        <input
          type="text"
          id="uid"
          onChange={(event) => inputIdChangedhandler(event)}
          value={userId}
        />
      </div>
      <div>
        First Name:
        <input
          type="text"
          id="txtFirstName"
          onChange={(event) => inputFirstNameChangedhandler(event)}
          value={userFirstName}
        />
      </div>
      <div>
        Last Name:
        <input
          type="text"
          id="txtLastName"
          onChange={(event) => inputLastNameChangedhandler(event)}
          value={userLastName}
        />
      </div>
      <div>
        Email:
        <input
          type="email"
          id="txtEmail"
          onChange={(event) => inputEmailChangedhandler(event)}
          value={userEmail}
        />
      </div>
      <input type="submit" />
    </form>
  );
};
export default AddUser;
