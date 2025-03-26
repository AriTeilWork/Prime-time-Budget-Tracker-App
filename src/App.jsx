import { useState } from 'react';
import './App.css';

function App() {
  
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

// Function to remove a transaction
function removeTransaction(id) {
  setTransactions(transactions.filter(transaction => transaction.id !== id));
  updateLocalStorage();
  updateValues();
}
}
