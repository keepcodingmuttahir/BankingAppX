import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layouts/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";

import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const [user, setUser] = useState(null);

  const bodyStyle = {
    backgroundImage: "linear-gradient(to right, #9796f0, #fbc7d4)",
    height: "100vh",
    overflow: "hidden",
  };

  useEffect(() => {
     //window.location.href = 'http://localhost:9080/login';

    const fetchUserRoles = async () => {
      try {
        const response = await axios.get('/api/v1/Users/getRoles', {
          withCredentials: true,
          headers: {
            'Authorization': 'Basic ' + btoa('admin:admin'),
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const roles = response.data;
          setUser({ role: roles.includes('ADMIN') ? 'admin' : 'user' });
        } else {
          console.error('Failed to fetch user roles');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserRoles();
  }, []);

  return (
    <Router>
      <div style={bodyStyle}>
        <Navbar user={user} />
        {user && user.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
      </div>
    </Router>
  );
}
export default App;
