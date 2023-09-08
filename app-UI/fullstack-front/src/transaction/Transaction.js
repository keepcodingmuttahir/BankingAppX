import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  let navigate = useNavigate();
  const { userId } = useParams();
  
  const [transactionData, setTransactionData] = useState({
    description: "",
    amount: "",
    transType: "debit"
  });

  const { description, amount, transType } = transactionData;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setTransactionData({
      ...transactionData,
      [name]: value
    });
  };

  const handleCreateTransaction = async () => {
    try {
      const dataWithUserId = {
        userId,
        ...transactionData
        // amount: transactionData.amount.toString(),
      };

      const response = await axios.post(
        `/api/v1/Transaction/${userId}`, transactionData,
        {
          withCredentials: true,
          headers: {
            Authorization: "Basic " + btoa("admin:admin")
          }
        }
      );
      navigate("/");
      if (response.status === 200) {
        console.log("Transaction created successfully:", response.data);
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };
  console.log(userId);
  return (
    <div className="container">
      <h2 className="my-4">Create Transaction</h2>
      <div className="form-group">
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          className="form-control"
          name="userId"
          value={userId}
          readOnly
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form-control"
          name="description"
          value={description}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount">amount</label>
        <input
          type="number"
          className="form-control"
          name="amount"
          value={amount}
          onChange={handleInputChange}
          pattern="[0-9]*" // This enforces numeric input
        />
      </div>

      <div className="form-group">
        <label htmlFor="transType">Transaction Type</label>
        <select
          className="form-control"
          name="transType"
          value={transType}
          onChange={handleInputChange}
        >
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleCreateTransaction}>
        Create Transaction
      </button>
      <Link className="btn btn-outline-danger" to="/">
        Cancel
      </Link>
    </div>
  );
};

export default Transaction;
