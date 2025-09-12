import { User } from './types';
import { mockUsers, generateUserId } from './mockData';

const STORAGE_KEYS = {
  USER: 'chat_app_user',
  USERS: 'chat_app_users',
  SESSION: 'chat_app_session'
};

// Get current authenticated user
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Save user session
export const saveUserSession = (user: User): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({
      userId: user.id,
      loginTime: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error saving user session:', error);
  }
};

// Clear user session
export const clearUserSession = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  } catch (error) {
    console.error('Error clearing user session:', error);
  }
};

// Get all registered users
export const getRegisteredUsers = (): User[] => {
  if (typeof window === 'undefined') return mockUsers;
  
  try {
    const usersData = localStorage.getItem(STORAGE_KEYS.USERS);
    const storedUsers = usersData ? JSON.parse(usersData) : [];
    
    // Merge with mock users, avoiding duplicates
    const allUsers = [...mockUsers];
    storedUsers.forEach((user: User) => {
      if (!allUsers.find(u => u.id === user.id)) {
        allUsers.push(user);
      }
    });
    
    return allUsers;
  } catch (error) {
    console.error('Error getting registered users:', error);
    return mockUsers;
  }
};

// Save registered users
export const saveRegisteredUsers = (users: User[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    // Only save users that are not in mockUsers
    const newUsers = users.filter(user => 
      !mockUsers.find(mockUser => mockUser.id === user.id)
    );
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(newUsers));
  } catch (error) {
    console.error('Error saving registered users:', error);
  }
};

// Validate login credentials
export const validateLogin = (username: string, password: string): User | null => {
  const users = getRegisteredUsers();
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
  
  if (user) {
    // In a real app, you'd validate the password hash
    // For demo purposes, any password works
    return user;
  }
  
  return null;
};

// Register new user
export const registerUser = (username: string, displayName: string, password: string): User | null => {
  const users = getRegisteredUsers();
  
  // Check if username already exists
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    return null; // Username taken
  }
  
  const newUser: User = {
    id: generateUserId(),
    username: username.toLowerCase(),
    displayName,
    avatar: `https://placehold.co/40x40?text=${displayName.split(' ').map(n => n[0]).join('').toUpperCase()}`,
    status: 'online',
    lastSeen: new Date(),
    bio: `New member - ${displayName}`
  };
  
  const updatedUsers = [...users, newUser];
  saveRegisteredUsers(updatedUsers);
  
  return newUser;
};

// Update user profile
export const updateUserProfile = (userId: string, updates: Partial<User>): User | null => {
  const users = getRegisteredUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return null;
  
  const updatedUser = { ...users[userIndex], ...updates };
  users[userIndex] = updatedUser;
  
  saveRegisteredUsers(users);
  
  // Update current session if it's the same user
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    saveUserSession(updatedUser);
  }
  
  return updatedUser;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Update user status
export const updateUserStatus = (userId: string, status: User['status']): void => {
  updateUserProfile(userId, { 
    status, 
    lastSeen: status === 'offline' ? new Date() : new Date() 
  });
};

// Get session info
export const getSessionInfo = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const sessionData = localStorage.getItem(STORAGE_KEYS.SESSION);
    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    console.error('Error getting session info:', error);
    return null;
  }
};

// Update last activity
export const updateLastActivity = (): void => {
  const sessionInfo = getSessionInfo();
  if (sessionInfo) {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({
      ...sessionInfo,
      lastActivity: new Date().toISOString()
    }));
  }
};

// Generate avatar URL from initials
export const generateAvatarUrl = (displayName: string): string => {
  const initials = displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  return `https://placehold.co/40x40?text=${initials}`;
};