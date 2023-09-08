import React from 'react'
import { Link } from "react-router-dom";
export const Welcome = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Welcome to our bank</h1>
          <p>Please login to use the website</p>
          <Link to="http://localhost:9080/login" className="btn btn-primary" style={{ fontSize: '18px' }}>
            Login
          </Link>
        </div>
      );
};
export default Welcome;
