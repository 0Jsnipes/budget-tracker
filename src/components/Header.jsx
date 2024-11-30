import React from 'react';

const Header = ({ paymentFrequency, setPaymentFrequency }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Budget Tracker</h1>
      <select
        className="p-2 border rounded"
        value={paymentFrequency}
        onChange={(e) => setPaymentFrequency(e.target.value)}
      >
        <option value="weekly">Weekly</option>
        <option value="bi-weekly">Bi-Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>
  );
};

export default Header;
