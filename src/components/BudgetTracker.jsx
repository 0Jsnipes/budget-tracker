import React, { useState, useEffect } from 'react';
import Header from './Header';
import ExpenseLine from './ExpenseLine';

const BudgetTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [paymentFrequency, setPaymentFrequency] = useState('bi-weekly');
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  // Load data from localStorage on component mount
  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    saveDataToLocalStorage();
  }, [expenses, paymentFrequency, monthlyIncome]);

  const loadDataFromLocalStorage = () => {
    const data = localStorage.getItem('budgetData');
    if (data) {
      const parsedData = JSON.parse(data);
      setExpenses(parsedData.expenses || []);
      setPaymentFrequency(parsedData.paymentFrequency || 'bi-weekly');
      setMonthlyIncome(parsedData.monthlyIncome || 0);
    }
  };

  const saveDataToLocalStorage = () => {
    const data = {
      expenses,
      paymentFrequency,
      monthlyIncome,
    };
    localStorage.setItem('budgetData', JSON.stringify(data));
  };

  const addExpense = () => {
    setExpenses([...expenses, { name: '', amount: 0 }]);
  };

  const updateExpense = (index, field, value) => {
    const updatedExpenses = expenses.map((expense, i) =>
      i === index ? { ...expense, [field]: value } : expense
    );
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  const calculateSavings = () => {
    let divisor = 1;
    switch (paymentFrequency) {
      case 'weekly':
        divisor = 4;
        break;
      case 'bi-weekly':
        divisor = 2;
        break;
      case 'monthly':
      default:
        divisor = 1;
    }
    const remainingIncome = monthlyIncome - totalExpenses;
    return remainingIncome / divisor;
  };

  const handleIncomeChange = (e) => {
    const value = e.target.value;
    setMonthlyIncome(value === '' ? 0 : Number(value)); // Update state, handle empty string
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow-lg rounded-md">
      <Header paymentFrequency={paymentFrequency} setPaymentFrequency={setPaymentFrequency} />
      <div className="mt-4">
        <label className="block text-lg font-medium">
          Monthly Income:
          <input
            type="number"
            value={monthlyIncome === 0 ? '' : monthlyIncome} // Display empty if income is 0
            onChange={handleIncomeChange}
            className="mt-2 p-2 border rounded w-full"
            placeholder="Enter your monthly income"
          />
        </label>
      </div>
      <div className="mt-4">
        {expenses.map((expense, index) => (
          <div key={index} className="flex items-center mt-2">
            <ExpenseLine
              expense={expense}
              onUpdate={(field, value) => updateExpense(index, field, value)}
            />
            <button
              onClick={() => deleteExpense(index)}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        onClick={addExpense}
      >
        Add Expense
      </button>
      <div className="mt-4 text-lg font-semibold">
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p>Amount to Save ({paymentFrequency}): ${calculateSavings().toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BudgetTracker;
