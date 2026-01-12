export interface UserProfile {
  name: string;
  weight: number; // in kg
  isOnboarded: boolean;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

export interface WaterLog {
  current: number; // ml
  goal: number; // ml
  history: { timestamp: number; amount: number }[];
  lastUpdated: string; // YYYY-MM-DD
}

export interface SleepConfig {
  bedTime: string; // "22:00"
  wakeTime: string; // "05:00"
  durationGoal: number; // hours, e.g. 8
}

export interface FitnessState {
  activityType: string;
  duration: number; // minutes
  scheduledTime: string; // HH:mm
  completed: boolean;
  lastUpdated: string; // YYYY-MM-DD
}

export interface PrayerTime {
  name: string;
  time: string; // HH:mm
  isNext: boolean;
}

export interface AppState {
  view: 'dashboard' | 'tasks' | 'hydration' | 'prayer' | 'settings' | 'sleep' | 'fitness';
}

export enum StorageKeys {
  PROFILE = 'lifeflow_profile',
  TASKS = 'lifeflow_tasks',
  WATER = 'lifeflow_water',
  THEME = 'lifeflow_theme',
  SLEEP = 'lifeflow_sleep',
  FITNESS = 'lifeflow_fitness',
}