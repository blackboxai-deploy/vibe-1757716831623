export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: Date;
  bio?: string;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  chatRoomId: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'system';
  reactions?: MessageReaction[];
  replyTo?: string;
  edited?: boolean;
  editedAt?: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface MessageReaction {
  emoji: string;
  userId: string;
  timestamp: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  type: 'public' | 'private' | 'direct';
  members: string[];
  createdAt: Date;
  lastMessage?: Message;
  unreadCount: number;
  isTyping?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, displayName: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export interface ChatState {
  currentRoom: string | null;
  rooms: ChatRoom[];
  messages: Record<string, Message[]>;
  users: User[];
  isTyping: Record<string, string[]>;
  sendMessage: (content: string, type?: Message['type']) => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  addReaction: (messageId: string, emoji: string) => void;
  removeReaction: (messageId: string, emoji: string) => void;
  setTyping: (roomId: string, isTyping: boolean) => void;
  searchMessages: (query: string) => Message[];
  markAsRead: (roomId: string) => void;
}

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnail?: string;
}

export interface TypingIndicator {
  userId: string;
  chatRoomId: string;
  timestamp: Date;
}

export interface Notification {
  id: string;
  type: 'message' | 'mention' | 'system';
  title: string;
  content: string;
  userId: string;
  chatRoomId?: string;
  timestamp: Date;
  read: boolean;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    desktop: boolean;
    sound: boolean;
    mentions: boolean;
  };
  privacy: {
    showOnlineStatus: boolean;
    showTypingIndicator: boolean;
  };
  chat: {
    fontSize: 'small' | 'medium' | 'large';
    compactMode: boolean;
    showTimestamps: boolean;
  };
}

export interface EmojiData {
  emoji: string;
  name: string;
  category: string;
  keywords: string[];
}

export interface SearchResult {
  type: 'message' | 'user' | 'room';
  id: string;
  content: string;
  highlight: string;
  timestamp?: Date;
  roomId?: string;
  userId?: string;
}