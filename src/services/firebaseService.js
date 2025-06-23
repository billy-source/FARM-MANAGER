import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Expenses Service
export const expenseService = {
  // Add new expense
  async addExpense(expense) {
    try {
      const docRef = await addDoc(collection(db, 'expenses'), {
        ...expense,
        createdAt: serverTimestamp(),
        timestamp: Date.now()
      });
      return { id: docRef.id, ...expense };
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  },

  // Get all expenses
  async getExpenses() {
    try {
      const q = query(collection(db, 'expenses'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching expenses:', error);
      return [];
    }
  },

  // Delete expense
  async deleteExpense(id) {
    try {
      await deleteDoc(doc(db, 'expenses', id));
      return true;
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  }
};

// Farm Activities Service
export const farmService = {
  // Add farm activity
  async addActivity(activity) {
    try {
      const docRef = await addDoc(collection(db, 'activities'), {
        ...activity,
        createdAt: serverTimestamp(),
        timestamp: Date.now()
      });
      return { id: docRef.id, ...activity };
    } catch (error) {
      console.error('Error adding activity:', error);
      throw error;
    }
  },

  // Get activities
  async getActivities() {
    try {
      const q = query(collection(db, 'activities'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching activities:', error);
      return [];
    }
  }
};