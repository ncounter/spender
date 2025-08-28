import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export function AddExpenseForm({ onAddExpense, editingExpense }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    if (editingExpense) {
      setName(editingExpense.name);
      setAmount(editingExpense.amount);
      setDate(editingExpense.date);
    } else {
      setName('');
      setAmount('');
      setDate(new Date().toISOString().slice(0, 10));
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    onAddExpense({ name, amount: parseFloat(amount), date });
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
          <input
            type="date"
            class="form-control"
            value={date}
            onInput={(e) => setDate(e.target.value)}
          />
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary">
            {editingExpense ? 'Update' : 'Add Expense'}
          </button>
        </div>
      </div>
    </form>
  );
}