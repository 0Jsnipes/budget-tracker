import React from 'react';

const ExpenseLine = ({ expense, onUpdate }) => {
  return (
    <div className="flex items-center mt-2">
      <input
        type="text"
        placeholder="Expense Name"
        value={expense.name}
        onChange={(e) => onUpdate('name', e.target.value)}
        className="p-2 border rounded w-full mr-2"
      />
      <input
        type="number"
        placeholder="Amount"
        value={expense.amount}
        onChange={(e) => onUpdate('amount', e.target.value)}
        className="p-2 border rounded w-24"
      />
    </div>
  );
};

export default ExpenseLine;
