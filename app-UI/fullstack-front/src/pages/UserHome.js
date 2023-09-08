import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useParams} from "react-router-dom";
import './styles.css'

export default function UserHome() {
  const [userData, setUserData] = useState({
    user: {},
    balance: {},
    transactions: [],
  });
  useEffect(() => {
    fetchUserData();
  }, []);
  
  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/v1/Users/all', {
                  withCredentials: true,
          headers: {
            Authorization: "Basic " + btoa("admin:admin")
          }
      });
      const { content } = response.data;
      setUserData(content);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const { user, balance, transactions } = userData;
 // console.log(user.id)
  return (
    <div className="container">
      <h2 className="my-4">User Dashboard</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>User Name:</th>
              <td>{user.userName}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Address:</th>
              <td>{user.address}</td>
            </tr>
            <tr>
              <th>Roles:</th>
              <td>{user.roles}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-responsive">
        <h3 className="my-4">Balance</h3>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Amount:</th>
              <td>{balance.amount}</td>
            </tr>
            <tr>
              <th>Debit:</th>
              <td>{balance.debit}</td>
            </tr>
            <tr>
              <th>Credit:</th>
              <td>{balance.credit}</td>
            </tr>
            <tr>
              <th>Date:</th>
              <td>{balance.date}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-responsive">
        <h3 className="my-4">Transactions</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td className={transaction.transType === 'debit' ? 'debit' : 'credit'}>
                {transaction.amount}
              </td>
              <td>{transaction.transType}</td>
            </tr>
              
            ))}
          </tbody>
          <Link className="btn btn-primary mx-2"
                to={`/transaction/${user.id}/${balance.amount}`}>
                Make Transaction 
                </Link>
                <Link className="btn btn-primary mx-2"
                to={`/transfer/${user.id}/${balance.amount}`}>
                Transfer Money
                </Link>      

        </table>
      </div>

     
      {/* <div className="my-4">
        <button className="btn btn-primary" onClick={() => handleMakeTransaction()}>
          Make Transaction
        </button>
      </div> */}
    </div>
  );
  
  const handleMakeTransaction = () => {
    // Implement the logic for making a transaction here
    console.log('Make Transaction clicked');
  };
}
