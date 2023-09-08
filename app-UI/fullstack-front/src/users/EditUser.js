import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate , useParams} from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditUser() {
  const {id}=useParams()
  let navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
    address: "",
    roles: "",
  });

  const { userName, password, email, address, roles } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value }); // Updated to use e.target.name
  };

  useEffect(()=>{
      loadUser()
  },[])

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put( `/api/v1/Users/${id}`, user, {
      withCredentials: true,
      headers: {
        'Authorization': 'Basic ' + btoa('admin:admin'),
      },
    });
    navigate("/");
  };
  

  const loadUser = async ()=>{
      const result = await axios.get(`/api/v1/Users/${id}`)
       setUser(result.data)
    }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Account</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control" // Updated class name
                placeholder="Enter user name"
                name="userName"
                value={userName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control" // Updated class name
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control" // Updated class name
                placeholder="Enter user Email"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control" // Updated class name
                placeholder="Enter address"
                name="address"
                value={address}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Roles" className="form-label">
                Roles
              </label>
              <select
                className="form-select" // Updated class name
                name="roles"
                value={roles}
                onChange={(e) => onInputChange(e)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
