import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { AddExpenseForm } from './components/AddExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { RecurrentExpensesForm } from './components/RecurrentExpensesForm';
import { RecurrentExpensesList } from './components/RecurrentExpensesList';

const API_URL = 'http://localhost:3001/api/expenses';

export function App() {
  const [expenses, setExpenses] = useState([]);
  const [recurrentExpenses, setRecurrentExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingRecurrentExpense, setEditingRecurrentExpense] = useState(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setExpenses(data.expenses || []);
        setRecurrentExpenses(data.recurrentExpenses || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const saveData = async () => {
      try {
        await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ expenses, recurrentExpenses }),
        });
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    saveData();
  }, [expenses, recurrentExpenses]);

  const addExpense = (expense) => {
    if (editingExpense) {
      const updatedExpenses = expenses.map((e) => (e === editingExpense ? expense : e));
      setExpenses(updatedExpenses);
      setEditingExpense(null);
    } else {
      setExpenses([...expenses, expense]);
    }
  };

  const addRecurrentExpense = (expense) => {
    if (editingRecurrentExpense) {
      const updatedRecurrentExpenses = recurrentExpenses.map((e) =>
        e === editingRecurrentExpense ? expense : e
      );
      setRecurrentExpenses(updatedRecurrentExpenses);
      setEditingRecurrentExpense(null);
    } else {
      setRecurrentExpenses([...recurrentExpenses, expense]);
    }
  };

  const deleteRecurrentExpense = (index) => {
    setRecurrentExpenses(recurrentExpenses.filter((_, i) => i !== index));
  };

  const deleteExpense = (expenseToDelete) => {
    setExpenses(expenses.filter((expense) => expense !== expenseToDelete));
  };


  return (
    <div class="container mt-5">
      <h1 class="mb-4">Spender</h1>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{editingExpense ? 'Edit Daily Expense' : 'Add Daily Expense'}</h5>
              <AddExpenseForm onAddExpense={addExpense} editingExpense={editingExpense} />
            </div>
          </div>
          <div class="card mt-4">
            <div class="card-body">
              <h5 class="card-title">Daily Expenses</h5>
              <ExpenseList 
                expenses={expenses.sort((a, b) => new Date(b.date) - new Date(a.date))} 
                onEditExpense={setEditingExpense}
                editingExpense={editingExpense}
                onDeleteExpense={deleteExpense}
              />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{editingRecurrentExpense ? 'Edit Recurrent Expense' : 'Add Recurrent Expense'}</h5>
              <RecurrentExpensesForm 
                onAddRecurrentExpense={addRecurrentExpense} 
                editingRecurrentExpense={editingRecurrentExpense} 
              />
            </div>
          </div>
          <div class="card mt-4">
            <div class="card-body">
              <h5 class="card-title">Recurrent Expenses</h5>
              <RecurrentExpensesList 
                recurrentExpenses={recurrentExpenses}
                onDeleteRecurrentExpense={deleteRecurrentExpense}
                onEditRecurrentExpense={setEditingRecurrentExpense}
                editingRecurrentExpense={editingRecurrentExpense}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}