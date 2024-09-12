import React, { useState } from 'react';
import axios from 'axios';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);  // Track if an item is being edited
  const [currentExpense, setCurrentExpense] = useState(null); // Store the current expense being edited

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/expenses/${id}`)
      .then(res => {
        console.log(res.data);
        onDelete(); // Refresh the list after deletion
      });
  };

  const handleEditClick = (expense) => {
    setIsEditing(true);
    setCurrentExpense(expense); // Set the expense being edited
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:5000/expenses/update/${currentExpense._id}`, currentExpense)
      .then(res => {
        console.log(res.data);
        onEdit(); // Refresh the list after update
        setIsEditing(false); // Close the editing mode
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentExpense((prevExpense) => ({
  ...prevExpense,
  [name]: value,
}));
  };

  return (
    <div>
      <h3>Expense List</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.date}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>
                <button onClick={() => handleDelete(expense._id)}>Delete</button>
                <button onClick={() => handleEditClick(expense)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Editing Form */}
      {isEditing && currentExpense && (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Date: </label>
            <input
              type="date"
              name="date"
              value={currentExpense.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Amount: </label>
            <input
              type="number"
              name="amount"
              value={currentExpense.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Category: </label>
            <input
              type="text"
              name="category"
              value={currentExpense.category}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description: </label>
            <input
              type="text"
              name="description"
              value={currentExpense.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Expense</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ExpenseList;

