import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "../../components/UserTable/userTable";

const User = (props) => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteUserHandler = (id) => {
    // console.log(userData[id]);
    const obj = {
      value: id,
    };
    axios
      .post("http://localhost:8080/", JSON.parse(JSON.stringify(obj)))
      .then((res) => {
        console.log("successful");
      })
      .catch((err) => {
        console.log("fail");
      });
    // console.log(obj);
    let updatedData = userData.filter((item) => item.id !== id);
    console.log(updatedData);
    setUserData(updatedData);
  };
  // axios.get('')
  // console.log(userData)
  let display = <h1>Loading ...</h1>;
  if (userData) {
    display = (
      <table border="1" cellPadding="10">
        <thead>
          <td>FIRST NAME</td>
          <td>LAST NAME</td>
          <td>EMAIL</td>
          <td>ACTIONS</td>
        </thead>
        {userData.map((item) => (
          <UserTable
            key={item.id}
            id={item.id}
            firstName={item.firstname}
            lastName={item.lastname}
            email={item.email}
            deleteItem={(id) => deleteUserHandler(id)}
          />
        ))}
        {/* <tr>{userData[0].id}</tr> */}
      </table>
    );
  }
  return display;
};

export default User;
