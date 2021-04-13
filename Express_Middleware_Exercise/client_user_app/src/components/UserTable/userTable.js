import React from "react";

const UserTable = (props) => {
  //   console.log(props.id);
  return (
    <tbody>
      <tr key={props.id}>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.email}</td>
        <td
          onClick={()=>props.deleteItem(props.id)}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          DELETE
        </td>
      </tr>
    </tbody>
  );
};

export default UserTable;
