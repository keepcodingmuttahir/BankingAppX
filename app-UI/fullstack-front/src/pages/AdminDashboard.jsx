import React from 'react'
import Home from './Home';
import EditUser from '../users/EditUser';
import AddUser from '../users/AddUser';
import { Routes, Route } from "react-router-dom";
import { Welcome } from './Welcome';
const AdminDashboard = () => {
    return (
        <div>
                 
        <Routes>
          <Route  path="/" element={<Home/>} />
           <Route  path="/addUser" element={ <AddUser/> } />
           <Route path = "/welcome" element = {<Welcome />}/>
           <Route  path="/edituser/:id" element={ <EditUser/> } />
         </Routes>
        </div>
    )
}

export default AdminDashboard;