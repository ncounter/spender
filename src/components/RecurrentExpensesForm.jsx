
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export function RecurrentExpensesForm({ onAddRecurrentExpense, editingRecurrentExpense }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('monthly');

  useEffect(() => {
    if (editingRecurrentExpense) {
      setName(editingRecurrentExpense.name);
      setAmount(editingRecurrentExpense.amount);
      setFrequency(editingRecurrentExpense.frequency);
    } else {
      setName('');
      setAmount('');
      setFrequency('monthly');
    }
  }, [editingRecurrentExpense]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    onAddRecurrentExpense({ name, amount: parseFloat(amount), frequency });
  };

  return (
    <form onSubmit={handleSubmit} class="mb-3">
      <div class="row">
        <div class="col">
          <input
            type="text"
            class="form-control"
            placeholder="Expense name"
            value={name}
            onInput={(e) => setName(e.target.value)}
          />
        </div>
        <div class="col">
          <input
            type="number"
            step="0.01"
            class="form-control"
            placeholder="Amount"
            value={amount}
            onInput={(e) => setAmount(e.target.value)}
          />
        </div>
        <div class="col">
          <select class="form-select" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="daily">Daily</option>
          </select>
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary">
            {editingRecurrentExpense ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </form>
  );
}
