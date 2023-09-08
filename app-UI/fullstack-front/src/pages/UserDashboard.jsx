import React from 'react'
import UserHome from './UserHome';
import Transaction from '../transaction/Transaction';
import { useParams, Link } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
import { Welcome } from './Welcome';

const AdminDashboard = () => {
  const { userId } = useParams();
    return (
        <div>
                 
        <Routes>
          <Route  path="/" element={<UserHome/>} />
          <Route  path="/welcome" element={<Welcome/>} />
          <Route path="/transaction/:userId" element={<Transaction/>} />
         </Routes>
        </div>
    )
}

export default AdminDashboard 