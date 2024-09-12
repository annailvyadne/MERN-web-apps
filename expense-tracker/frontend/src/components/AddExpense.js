import React, { useState } from 'react';
import axios from 'axios';

const AddExpense = ({ onAdd }) => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const expense = {
      date,
      amount,
      category,
      description,
    };

    axios.post('http://localhost:5000/expenses/add', expense)
      .then(res => {
        console.log(res.data);
        onAdd(); // Fetch updated expenses after adding
      });

    // Reset form
    setDate('');
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <div>
      <h3>Add New Expense</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Date: </label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Amount: </label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div>
          <label>Category: </label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
