import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

const ExpenseChart = ({ expenses }) => {
  const chartData = useMemo(() => {
    // Monthly data
    const monthlyData = {};
    expenses.forEach(expense => {
      const month = new Date(expense.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      monthlyData[month] = (monthlyData[month] || 0) + expense.amount;
    });

    const monthlyChart = Object.entries(monthlyData).map(([month, amount]) => ({
      month,
      amount: parseFloat(amount.toFixed(2))
    }));

    // Category data
    const categoryData = {};
    expenses.forEach(expense => {
      categoryData[expense.category] = (categoryData[expense.category] || 0) + expense.amount;
    });

    const categoryChart = Object.entries(categoryData).map(([category, amount]) => ({
      name: category,
      value: parseFloat(amount.toFixed(2))
    }));

    return { monthlyChart, categoryChart };
  }, [expenses]);

  const COLORS = [
    '#22C55E', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#F97316', '#84CC16', '#EC4899', '#6B7280'
  ];

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12">
        <div className="text-center text-gray-500">
          <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl font-semibold mb-2">No data to display</p>
          <p className="text-gray-400">Add some expenses to see your spending analytics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Monthly Spending Chart */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center mb-8">
          <div className="p-3 bg-yellow-100 rounded-xl mr-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Monthly Spending Trend</h3>
            <p className="text-gray-600">Track your expenses over time</p>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData.monthlyChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Amount']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="amount" fill="#22C55E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown Chart */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center mb-8">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            <PieChartIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Spending by Category</h3>
            <p className="text-gray-600">Breakdown of expenses by type</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.categoryChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.categoryChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Amount']}
                  contentStyle={{ 
                    backgroundColor: '#', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 text-lg mb-6">Category Breakdown</h4>
            {chartData.categoryChart.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="font-medium text-gray-900">{category.name}</span>
                </div>
                <span className="font-bold text-gray-900">${category.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;