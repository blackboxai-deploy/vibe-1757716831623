import { User, ChatRoom, Message, EmojiData } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    displayName: 'John Doe',
    avatar: 'https://placehold.co/40x40?text=JD',
    status: 'online',
    lastSeen: new Date(),
    bio: 'Full-stack developer passionate about React and Node.js'
  },
  {
    id: '2',
    username: 'jane_smith',
    displayName: 'Jane Smith',
    avatar: 'https://placehold.co/40x40?text=JS',
    status: 'away',
    lastSeen: new Date(Date.now() - 300000), // 5 minutes ago
    bio: 'UX/UI Designer crafting beautiful user experiences'
  },
  {
    id: '3',
    username: 'bob_wilson',
    displayName: 'Bob Wilson',
    avatar: 'https://placehold.co/40x40?text=BW',
    status: 'busy',
    lastSeen: new Date(Date.now() - 600000), // 10 minutes ago
    bio: 'DevOps engineer automating everything'
  },
  {
    id: '4',
    username: 'alice_johnson',
    displayName: 'Alice Johnson',
    avatar: 'https://placehold.co/40x40?text=AJ',
    status: 'online',
    lastSeen: new Date(),
    bio: 'Data scientist exploring AI and machine learning'
  },
  {
    id: '5',
    username: 'charlie_brown',
    displayName: 'Charlie Brown',
    avatar: 'https://placehold.co/40x40?text=CB',
    status: 'offline',
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
    bio: 'Mobile app developer for iOS and Android'
  }
];

export const mockRooms: ChatRoom[] = [
  {
    id: 'general',
    name: 'General',
    description: 'General discussion for everyone',
    type: 'public',
    members: ['1', '2', '3', '4', '5'],
    createdAt: new Date('2024-01-01'),
    unreadCount: 0,
    isTyping: []
  },
  {
    id: 'tech-talk',
    name: 'Tech Talk',
    description: 'Discussions about technology, programming, and development',
    type: 'public',
    members: ['1', '2', '4'],
    createdAt: new Date('2024-01-01'),
    unreadCount: 2,
    isTyping: []
  },
  {
    id: 'random',
    name: 'Random',
    description: 'Random conversations and off-topic discussions',
    type: 'public',
    members: ['2', '3', '5'],
    createdAt: new Date('2024-01-01'),
    unreadCount: 0,
    isTyping: []
  },
  {
    id: 'design',
    name: 'Design',
    description: 'UI/UX design discussions and feedback',
    type: 'public',
    members: ['1', '2', '4'],
    createdAt: new Date('2024-01-01'),
    unreadCount: 1,
    isTyping: []
  }
];

export const mockMessages: Record<string, Message[]> = {
  'general': [
    {
      id: '1',
      content: 'Welcome to the general chat! 👋',
      userId: '1',
      chatRoomId: 'general',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
      status: 'read',
      reactions: [{ emoji: '👋', userId: '2', timestamp: new Date() }]
    },
    {
      id: '2',
      content: 'Hey everyone! Great to be here.',
      userId: '2',
      chatRoomId: 'general',
      timestamp: new Date(Date.now() - 3500000),
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      content: 'This chat app looks amazing! 🚀',
      userId: '4',
      chatRoomId: 'general',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text',
      status: 'read',
      reactions: [
        { emoji: '🚀', userId: '1', timestamp: new Date() },
        { emoji: '💯', userId: '2', timestamp: new Date() }
      ]
    },
    {
      id: '4',
      content: 'Who\'s working on interesting projects lately?',
      userId: '3',
      chatRoomId: 'general',
      timestamp: new Date(Date.now() - 900000),
      type: 'text',
      status: 'read'
    },
    {
      id: '5',
      content: 'I\'m building a new React app with Next.js. Really enjoying the app router! 💻',
      userId: '1',
      chatRoomId: 'general',
      timestamp: new Date(Date.now() - 600000),
      type: 'text',
      status: 'read'
    }
  ],
  'tech-talk': [
    {
      id: '6',
      content: 'What do you think about the new React Server Components?',
      userId: '1',
      chatRoomId: 'tech-talk',
      timestamp: new Date(Date.now() - 7200000),
      type: 'text',
      status: 'read'
    },
    {
      id: '7',
      content: 'They\'re game-changing! The performance improvements are incredible.',
      userId: '4',
      chatRoomId: 'tech-talk',
      timestamp: new Date(Date.now() - 7000000),
      type: 'text',
      status: 'read'
    },
    {
      id: '8',
      content: 'Has anyone tried the new Next.js 15 features? The caching improvements look promising.',
      userId: '2',
      chatRoomId: 'tech-talk',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
      status: 'read'
    },
    {
      id: '9',
      content: 'I\'ve been experimenting with Turbopack. The build speeds are insane! ⚡',
      userId: '1',
      chatRoomId: 'tech-talk',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text',
      status: 'read',
      reactions: [{ emoji: '⚡', userId: '4', timestamp: new Date() }]
    }
  ],
  'random': [
    {
      id: '10',
      content: 'Anyone else excited for the weekend? 🎉',
      userId: '2',
      chatRoomId: 'random',
      timestamp: new Date(Date.now() - 5400000),
      type: 'text',
      status: 'read',
      reactions: [{ emoji: '🎉', userId: '3', timestamp: new Date() }]
    },
    {
      id: '11',
      content: 'Planning to go hiking! The weather looks perfect.',
      userId: '5',
      chatRoomId: 'random',
      timestamp: new Date(Date.now() - 5000000),
      type: 'text',
      status: 'read'
    },
    {
      id: '12',
      content: 'That sounds amazing! I might join a local coding meetup instead 👨‍💻',
      userId: '3',
      chatRoomId: 'random',
      timestamp: new Date(Date.now() - 2700000),
      type: 'text',
      status: 'read'
    }
  ],
  'design': [
    {
      id: '13',
      content: 'Working on a new design system. Anyone have favorite color palette tools?',
      userId: '2',
      chatRoomId: 'design',
      timestamp: new Date(Date.now() - 7200000),
      type: 'text',
      status: 'read'
    },
    {
      id: '14',
      content: 'I love Coolors.co and Adobe Color. Both are fantastic for inspiration!',
      userId: '4',
      chatRoomId: 'design',
      timestamp: new Date(Date.now() - 6800000),
      type: 'text',
      status: 'read'
    },
    {
      id: '15',
      content: 'The new shadcn/ui components are so well designed. Perfect inspiration! ✨',
      userId: '1',
      chatRoomId: 'design',
      timestamp: new Date(Date.now() - 1800000),
      type: 'text',
      status: 'read',
      reactions: [{ emoji: '✨', userId: '2', timestamp: new Date() }]
    }
  ]
};

export const commonEmojis: EmojiData[] = [
  { emoji: '😀', name: 'grinning face', category: 'people', keywords: ['happy', 'smile'] },
  { emoji: '😂', name: 'face with tears of joy', category: 'people', keywords: ['funny', 'laugh'] },
  { emoji: '😍', name: 'smiling face with heart-eyes', category: 'people', keywords: ['love', 'heart'] },
  { emoji: '🤔', name: 'thinking face', category: 'people', keywords: ['think', 'wonder'] },
  { emoji: '😭', name: 'loudly crying face', category: 'people', keywords: ['sad', 'cry'] },
  { emoji: '👍', name: 'thumbs up', category: 'people', keywords: ['good', 'yes', 'like'] },
  { emoji: '👎', name: 'thumbs down', category: 'people', keywords: ['bad', 'no', 'dislike'] },
  { emoji: '❤️', name: 'red heart', category: 'symbols', keywords: ['love', 'heart'] },
  { emoji: '🔥', name: 'fire', category: 'nature', keywords: ['hot', 'fire', 'awesome'] },
  { emoji: '💯', name: 'hundred points', category: 'symbols', keywords: ['perfect', 'hundred'] },
  { emoji: '🚀', name: 'rocket', category: 'transport', keywords: ['rocket', 'launch', 'space'] },
  { emoji: '✨', name: 'sparkles', category: 'nature', keywords: ['sparkle', 'magic'] },
  { emoji: '🎉', name: 'party popper', category: 'objects', keywords: ['party', 'celebration'] },
  { emoji: '💻', name: 'laptop computer', category: 'objects', keywords: ['computer', 'laptop', 'tech'] },
  { emoji: '☕', name: 'hot beverage', category: 'food', keywords: ['coffee', 'tea', 'drink'] },
  { emoji: '🌟', name: 'glowing star', category: 'nature', keywords: ['star', 'awesome'] },
  { emoji: '🎯', name: 'direct hit', category: 'activity', keywords: ['target', 'goal'] },
  { emoji: '💡', name: 'light bulb', category: 'objects', keywords: ['idea', 'light', 'bulb'] },
  { emoji: '🎨', name: 'artist palette', category: 'objects', keywords: ['art', 'design', 'creative'] },
  { emoji: '📱', name: 'mobile phone', category: 'objects', keywords: ['phone', 'mobile', 'device'] }
];

export const autoResponses: string[] = [
  "That's interesting! Tell me more about that.",
  "I completely agree with you! 👍",
  "Great point! I hadn't thought of it that way.",
  "Thanks for sharing! Very helpful information.",
  "Awesome! Keep up the great work! 🚀",
  "That sounds really cool! I'd love to try that.",
  "Nice! I'll have to check that out later.",
  "Interesting perspective! Makes total sense.",
  "Thanks! That's exactly what I was looking for.",
  "Wow, that's impressive! Great job! ✨"
];

export const systemMessages: string[] = [
  "joined the chat",
  "left the chat",
  "changed their status",
  "updated their profile",
  "shared a file",
  "started a voice call",
  "ended the call"
];

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get room by ID
export const getRoomById = (id: string): ChatRoom | undefined => {
  return mockRooms.find(room => room.id === id);
};

// Helper function to generate random auto response
export const getRandomAutoResponse = (): string => {
  return autoResponses[Math.floor(Math.random() * autoResponses.length)];
};

// Helper function to format timestamp
export const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString();
};

// Helper function to generate message ID
export const generateMessageId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Helper function to generate user ID
export const generateUserId = (): string => {
  return 'user_' + Date.now().toString() + Math.random().toString(36).substr(2, 5);
};