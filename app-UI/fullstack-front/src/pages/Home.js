import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [users, setUsers] = useState([]);
  const { id } = useParams()

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("/api/v1/Users");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    const parsedId = parseInt(id);
    if (!isNaN(parsedId)) {
      await axios.delete(`/api/v1/Users/${parsedId}`, {
        withCredentials: true,
        headers: {
          'Authorization': 'Basic ' + btoa('admin:admin'),
        },
      });
      loadUsers();
    } else {
      console.error('Invalid user ID:', id);
    }
  }

  return (
    <div className="container">
      <div className="py-3">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">User Name</th>
              <th scope="col">Password</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Roles</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.password.replace("{noop}", "")}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.roles}</td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/edituser/${user.id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
}
