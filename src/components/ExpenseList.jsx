import React from 'react';
import { Trash2, Calendar, Tag, DollarSign, TrendingUp } from 'lucide-react';

const ExpenseList = ({ expenses, onDeleteExpense, totalAmount }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await onDeleteExpense(id);
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Seeds': 'bg-green-100 text-green-800 border-green-200',
      'Fertilizers': 'bg-blue-100 text-blue-800 border-blue-200',
      'Pesticides': 'bg-red-100 text-red-800 border-red-200',
      'Labor': 'bg-purple-100 text-purple-800 border-purple-200',
      'Equipment': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Fuel': 'bg-orange-100 text-orange-800 border-orange-200',
      'Maintenance': 'bg-gray-100 text-gray-800 border-gray-200',
      'Utilities': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Insurance': 'bg-pink-100 text-pink-800 border-pink-200',
      'Other': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Expense Tracking</h3>
            <p className="opacity-90">Monitor your farm spending and budget</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm font-medium">Total Expenses</span>
            </div>
            <p className="text-3xl font-bold">${totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <div key={expense.id} className="p-6 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="font-semibold text-gray-900 text-lg">{expense.description}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(expense.category)}`}>
                      {expense.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(expense.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold text-gray-900 text-lg">${expense.amount}</span>
                    </div>
                  </div>
                  
                  {expense.notes && (
                    <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{expense.notes}</p>
                  )}
                </div>
                
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="ml-6 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete expense"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-gray-500">
            <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl font-semibold mb-2">No expenses recorded yet</p>
            <p className="text-gray-400">Start tracking your farm expenses to get insights into your spending patterns.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;