import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './UserHome.css';

export default function UserHome() {
  const [userData, setUserData] = useState({
    user: {},
    balance: {},
    transactions: [],
  });

  // State variables to control visibility
  const [showBalance, setShowBalance] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/v1/Users/all', {
        withCredentials: true,
        headers: {
          Authorization: 'Basic ' + btoa('admin:admin'),
        },
      });
      const { content } = response.data;
      setUserData(content);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const { user, balance, transactions } = userData;

  return (
    <div style={{ maxHeight: '80vh', overflowY: 'auto', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h2 className="my-4">User Dashboard</h2>
      <div className="table-responsive "  >
        <table className="table table-bordered " style={{ width: '50%', margin: '0 auto' }}>
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

      {/* Balance dropdown */}
      <div className="dropdown">
        <button
          className="btn btn-outline-primary dropdown-toggle mb-3 "
          type="button"
          onClick={() => setShowBalance(!showBalance)}
        >
          Balance
        </button>
        {showBalance && (
          <div className="dropdown-content" style={{ width: '50%', margin: '0 auto' }}>
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
        )}
      </div>

      {/* Transactions dropdown */}
      <div className="dropdown" >
        <button
          className="btn btn-outline-primary dropdown-toggle mb-3"
          type="button"
          onClick={() => setShowTransactions(!showTransactions)}
        >
          Transactions
        </button>
        {showTransactions && (
          <div className="dropdown-content" style={{ width: '50%', margin: '0 auto' }}>
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
                    <td
                      className={
                        transaction.transType === 'debit' ? 'debit' : 'credit'
                      }
                    >
                      {transaction.amount}
                    </td>
                    <td>{transaction.transType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="my-4">
        <Link
          className="btn btn-primary mx-2"
          to={`/transaction/${user.id}/${balance.amount}`}
        >
          Make Transaction
        </Link>
        <Link
          className="btn btn-primary mx-2"
          to={`/transfer/${user.id}/${balance.amount}`}
        >
          Transfer Money
        </Link>
      </div>
    </div>
  );
}
