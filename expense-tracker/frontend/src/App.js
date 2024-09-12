import React, { useState, useEffect } from 'react';
import './App.css';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import axios from 'axios';

function App() {
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses from the backend
  const fetchExpenses = () => {
    axios.get('http://localhost:5000/expenses/')
      .then(res => setExpenses(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchExpenses(); // Fetch expenses on component mount
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Expense Tracker</h1>
      </header>
      <div className="container">
        <AddExpense onAdd={fetchExpenses} /> {/* Pass fetchExpenses to AddExpense */}
        <ExpenseList expenses={expenses} onDelete={fetchExpenses} onEdit={fetchExpenses} /> {/* Pass fetchExpenses to onEdit */}
      </div>
    </div>
  );
}

export default App;
