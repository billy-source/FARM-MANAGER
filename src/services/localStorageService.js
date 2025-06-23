// Local Storage Service for Farm Management
export const localStorageService = {
  // Expenses
  getExpenses() {
    try {
      const expenses = localStorage.getItem('farm_expenses');
      return expenses ? JSON.parse(expenses) : [];
    } catch (error) {
      console.error('Error loading expenses:', error);
      return [];
    }
  },

  saveExpenses(expenses) {
    try {
      localStorage.setItem('farm_expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  },

  addExpense(expense) {
    const expenses = this.getExpenses();
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    expenses.unshift(newExpense);
    this.saveExpenses(expenses);
    return newExpense;
  },

  deleteExpense(id) {
    const expenses = this.getExpenses();
    const filteredExpenses = expenses.filter(expense => expense.id !== id);
    this.saveExpenses(filteredExpenses);
  },

  // Farm Activities
  getFarmActivities() {
    try {
      const activities = localStorage.getItem('farm_activities');
      return activities ? JSON.parse(activities) : [];
    } catch (error) {
      console.error('Error loading activities:', error);
      return [];
    }
  },

  saveFarmActivities(activities) {
    try {
      localStorage.setItem('farm_activities', JSON.stringify(activities));
    } catch (error) {
      console.error('Error saving activities:', error);
    }
  },

  addFarmActivity(activity) {
    const activities = this.getFarmActivities();
    const newActivity = {
      ...activity,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    activities.unshift(newActivity);
    this.saveFarmActivities(activities);
    return newActivity;
  },

  // Settings
  getSettings() {
    try {
      const settings = localStorage.getItem('farm_settings');
      return settings ? JSON.parse(settings) : {
        farmName: 'My Farm',
        location: 'Farm Location',
        farmSize: 100,
        currency: 'USD'
      };
    } catch (error) {
      console.error('Error loading settings:', error);
      return {
        farmName: 'My Farm',
        location: 'Farm Location',
        farmSize: 100,
        currency: 'USD'
      };
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem('farm_settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }
};