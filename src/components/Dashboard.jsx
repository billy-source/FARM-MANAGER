import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  Cloud,
  Sprout,
  BarChart3,
  Activity,
  RefreshCw,
  Calculator,
  Plus,
  LogOut, // <--- NEW: Import LogOut icon
  User // <--- NEW: Import User icon
} from 'lucide-react';
import { localStorageService } from '../services/localStorageService';
import { weatherService } from '../services/weatherService';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseChart from './ExpenseChart';
import WeatherCard from './WeatherCard';
import FarmCalculator from './FarmCalculator';
// ***************************************************************
// NEW IMPORTS FOR AUTHENTICATION
import { useAuth } from '../contexts/AuthContext'; // Adjust path as needed
import AuthForm from './Auth/AuthForm'; // Adjust path as needed
// ***************************************************************

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  // ***************************************************************
  // NEW: Get currentUser and logout function from AuthContext
  const { currentUser, logout } = useAuth();
  // ***************************************************************

  // Load data on component mount
  useEffect(() => {
    // ***************************************************************
    // NEW: Only load data if a user is logged in
    if (currentUser) {
      loadData();
    } else {
      // If no user, ensure loading is set to false so LoginForm can be displayed
      setLoading(false);
      // Optionally clear data if user logs out or isn't logged in initially
      setExpenses([]);
      setWeather(null);
      setForecast([]);
    }
    // ***************************************************************
  }, [currentUser]); // Dependency: Re-run when currentUser changes (login/logout)

  const loadData = async () => {
    setLoading(true);
    try {
      // Load expenses from localStorage
      // ***************************************************************
      // FUTURE IMPROVEMENT: If using Firebase, this would be where you fetch from Firestore
      // For now, it stays localStorage but remember to scope data by userId if you move to Firebase.
      // ***************************************************************
      const expensesData = localStorageService.getExpenses();
      setExpenses(expensesData);

      // Load weather data
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(),
        weatherService.getForecast()
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      console.error('Error loading data:', error);
      // ***************************************************************
      // NEW: Handle specific errors, e.g., if weather service fails
      // ***************************************************************
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleAddExpense = async (expenseData) => {
    try {
      // ***************************************************************
      // FUTURE IMPROVEMENT: If using Firebase, you'd add userId here
      // and use your Firestore hook's addItem function.
      // const newExpense = await addExpenseToFirestore({ ...expenseData, userId: currentUser.uid });
      // ***************************************************************
      const newExpense = localStorageService.addExpense(expenseData);
      setExpenses(prev => [newExpense, ...prev]);
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      // ***************************************************************
      // FUTURE IMPROVEMENT: If using Firebase, you'd use your Firestore hook's deleteItem function.
      // await deleteItemFromFirestore(id);
      // ***************************************************************
      localStorageService.deleteExpense(id);
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  };

  // Calculate expense statistics
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  }).reduce((sum, expense) => sum + expense.amount, 0);

  const weeklyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return expenseDate >= oneWeekAgo;
  }).reduce((sum, expense) => sum + expense.amount, 0);

  const avgExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
        active
          ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );

  // ***************************************************************
  // NEW: Render AuthForm if no current user
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <AuthForm />
      </div>
    );
  }
  // ***************************************************************

  // Existing loading state (for when a user IS logged in but data is still loading)
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
          <p className="mt-6 text-xl text-gray-600 font-medium">Loading farm data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl">
                <Sprout className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Farm Management Platform</h1>
                <p className="text-gray-600 text-lg">Track expenses, monitor weather, and optimize your farming operations</p>
              </div>
            </div>
            {/* *************************************************************** */}
            {/* NEW: User Info and Logout button in header */}
            <div className="flex items-center space-x-4">
              {currentUser && (
                <div className="flex items-center space-x-2 text-gray-700 font-medium">
                  <User className="h-5 w-5" />
                  <span>{currentUser.email}</span> {/* Display user's email */}
                </div>
              )}
              <button
                onClick={refreshData}
                disabled={refreshing}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all flex items-center space-x-2 disabled:opacity-50 transform hover:scale-105 shadow-lg"
              >
                <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="font-semibold">Refresh</span>
              </button>
              {currentUser && ( // Only show logout if a user is logged in
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all flex items-center space-x-2 transform hover:scale-105 shadow-lg"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-semibold">Logout</span>
                </button>
              )}
            </div>
            {/* *************************************************************** */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto bg-white p-2 rounded-2xl shadow-lg">
          <TabButton
            id="overview"
            label="Overview"
            icon={BarChart3}
            active={activeTab === 'overview'}
            onClick={setActiveTab}
          />
          <TabButton
            id="expenses"
            label="Add Expense"
            icon={Plus}
            active={activeTab === 'expenses'}
            onClick={setActiveTab}
          />
          <TabButton
            id="analytics"
            label="Analytics"
            icon={TrendingUp}
            active={activeTab === 'analytics'}
            onClick={setActiveTab}
          />
          <TabButton
            id="weather"
            label="Weather"
            icon={Cloud}
            active={activeTab === 'weather'}
            onClick={setActiveTab}
          />
          <TabButton
            id="calculator"
            label="Farm Calculator"
            icon={Calculator}
            active={activeTab === 'calculator'}
            onClick={setActiveTab}
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Expenses</p>
                    <p className="text-3xl font-bold text-blue-600">${totalExpenses.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-2">All time</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-blue-200">
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">This Month</p>
                    <p className="text-3xl font-bold text-green-600">${monthlyExpenses.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-2">Current month</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-green-100 to-green-200">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">This Week</p>
                    <p className="text-3xl font-bold text-purple-600">${weeklyExpenses.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-100 to-purple-200">
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Average Expense</p>
                    <p className="text-3xl font-bold text-orange-600">${avgExpense.toFixed(2)}</p>
                    <p className="text-xs text-gray-500 mt-2">Per transaction</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-100 to-orange-200">
                    <Activity className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Weather and Recent Expenses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WeatherCard weather={weather} forecast={forecast} />
              <ExpenseList
                expenses={expenses.slice(0, 5)}
                onDeleteExpense={handleDeleteExpense}
                totalAmount={totalExpenses}
              />
            </div>
          </div>
        )}

        {/* Add Expense Tab */}
        {activeTab === 'expenses' && (
          <div className="max-w-2xl mx-auto">
            <ExpenseForm onAddExpense={handleAddExpense} />
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <ExpenseChart expenses={expenses} />
            <ExpenseList
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
              totalAmount={totalExpenses}
            />
          </div>
        )}

        {/* Weather Tab */}
        {activeTab === 'weather' && (
          <div className="max-w-2xl mx-auto">
            <WeatherCard weather={weather} forecast={forecast} />
          </div>
        )}

        {/* Farm Calculator Tab */}
        {activeTab === 'calculator' && (
          <FarmCalculator weather={weather} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;