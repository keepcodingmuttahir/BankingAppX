import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Transfer = () => {
  let navigate = useNavigate();
  const [reciever, setReciever] = useState([]);
  const { userId, balance } = useParams();

  const [transactionData, setTransactionData] = useState({
    description: "",
    amount: "",
    recieverId: "",
    transType: "debit"
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`/api/v1/Users/${recieverId}`);
      setReciever(result.data);
    } catch (error) {
      console.error("User not found:", error.message);
    }
  };

  const { description, amount, transType, recieverId } = transactionData;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setTransactionData({
      ...transactionData,
      [name]: value
    });
  };

  const handleCreateTransaction = async () => {
    try {

      if (reciever.roles === "ADMIN" || userId === recieverId) {
        console.error("Transaction not allowed for this user.");
        return;
      }
      console.log(reciever.roles)
      const numericAmount = parseFloat(transactionData.amount);
      const numericBalance = parseFloat(balance);

      if (numericAmount > numericBalance) {
        console.error("Amount too large");
        return;
      }
      const receiverTransactionData = {
        ...transactionData,
        transType: "credit"
      };
      const recieverresponse = await axios.post(
        `/api/v1/Transaction/${recieverId}`,
        receiverTransactionData,
        {
          withCredentials: true,
          headers: {
            Authorization: "Basic " + btoa("admin:admin")
          }
        }
      );
      const senderTransactionData = {
        ...transactionData,
        transType: "debit"
      };

      // Check if the response from the first request is okay
      if (recieverresponse.status === 200) {
        const response = await axios.post(
          `/api/v1/Transaction/${userId}`,
          senderTransactionData,
          {
            withCredentials: true,
            headers: {
              Authorization: "Basic " + btoa("admin:admin")
            }
          }
        );

        navigate("/");
        if (response.status === 200 && recieverresponse === 200) {
          console.log("Transaction created successfully:", response.data);
        }
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
        <label className="my-3" htmlFor="recieverId">Reciever Id</label>
        <input
          type="number"
          className="form-control"
          name="recieverId" // Corrected the name attribute here
          value={recieverId}
          onChange={handleInputChange}
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
      <div className="form-group mb-3">
        <label className="my-3" htmlFor="amount">amount</label>
        <input
          type="number"
          className="form-control"
          name="amount"
          value={amount}
          onChange={handleInputChange}
          pattern="[0-9]*" // This enforces numeric input
        />
      </div>

      <button className="btn btn-primary" onClick={handleCreateTransaction}>
        Transfer Money
      </button>
      <Link className="btn btn-outline-danger" to="/">
        Cancel
      </Link>
    </div>
  );
};

export default Transfer;
