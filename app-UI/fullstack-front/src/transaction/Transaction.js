import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  let navigate = useNavigate();
  const { userId, balance } = useParams();


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

      const numericAmount = parseFloat(transactionData.amount);
      const numericBalance = parseFloat(balance);


      if (numericAmount > numericBalance && transType == "debit") {
        console.error("Amount too large");
        return;
      }

      const dataWithUserId = {
        userId,
        ...transactionData
      };

      const response = await axios.post(
        `/api/v1/Transaction/${userId}`, dataWithUserId,
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

  return (
    <div className="container"  style={{ maxHeight: '80vh', overflowY: 'auto'}}>
      <h2 className="my-4">Create Transaction</h2>
      <div className="form-group">
        <label className="my-3" htmlFor="userId">User ID</label>
        <input
          type="text"
          className="form-control"
          name="userId"
          value={userId}
          readOnly
        />
      </div>

      <div className="form-group">
        <label className="my-3" htmlFor="balance">Balance</label>
        <input
          type="text"
          className="form-control"
          name="balance"
          value={balance}
          readOnly
        />
      </div>

      <div className="form-group">
        <label className="my-3" htmlFor="description">Description</label>
        <input
          type="text"
          className="form-control"
          name="description"
          value={description}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label className="my-3" htmlFor="amount">Amount</label>
        <input
          type="number"
          className="form-control"
          name="amount"
          value={amount}
          onChange={handleInputChange}
          pattern="[0-9]*"
        />
      </div>

      <div className="form-group mb-3">
        <label className="my-3" htmlFor="transType">Transaction Type</label>
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
