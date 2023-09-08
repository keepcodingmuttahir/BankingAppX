import React from 'react'
import UserHome from './UserHome';
import Transaction from '../transaction/Transaction';
import Transfer from '../transaction/Transfer';
import { useParams, Link } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
import { Welcome } from './Welcome';

const AdminDashboard = () => {
  //const { userId } = useParams();
    return (
        <div>
                 
        <Routes>
          <Route  path="/" element={<UserHome/>} />
          <Route  path="/welcome" element={<Welcome/>} />
          <Route path="/transaction/:userId/:balance" element={<Transaction/>} />
          <Route path="/transfer/:userId/:balance" element={<Transfer/>} />
         </Routes>
        </div>
    )
}

export default AdminDashboard 