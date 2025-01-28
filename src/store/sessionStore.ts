import { create } from 'zustand';

interface SessionData {
  moodEntries: Array<{
    timestamp: string;
    mood: number;
    label: string;
  }>;
  breathingExercises: Array<{
    timestamp: string;
    duration: number;
    cycles: number;
  }>;
  gratitudeEntries: Array<{
    id: string;
    content: string;
    timestamp: string;
  }>;
  mindfulWritings: Array<{
    id: string;
    content: string;
    timestamp: string;
  }>;
  memoryGameStats: Array<{
    timestamp: string;
    moves: number;
    timeElapsed: number;
    won: boolean;
  }>;
  selfCare: {
    habits: Array<{
      id: string;
      label: string;
      completed: boolean;
      timestamp: string;
    }>;
    goals: Array<{
      id: string;
      title: string;
      progress: number;
      timestamp: string;
    }>;
    energyLevels: Array<{
      time: string;
      level: number;
      timestamp: string;
    }>;
  };
}

const STORAGE_KEY = 'mindfulpath_session';

// Load initial state from sessionStorage
const loadInitialState = (): SessionData => {
  if (typeof window === 'undefined') return getDefaultState();
  
  const saved = sessionStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : getDefaultState();
};

const getDefaultState = (): SessionData => ({
  moodEntries: [],
  breathingExercises: [],
  gratitudeEntries: [],
  mindfulWritings: [],
  memoryGameStats: [],
  selfCare: {
    habits: [],
    goals: [],
    energyLevels: []
  }
});

interface SessionStore extends SessionData {
  addMoodEntry: (mood: number, label: string) => void;
  addBreathingExercise: (duration: number, cycles: number) => void;
  addGratitudeEntry: (content: string) => void;
  removeGratitudeEntry: (id: string) => void;
  addMindfulWriting: (content: string) => void;
  removeMindfulWriting: (id: string) => void;
  addMemoryGameResult: (moves: number, timeElapsed: number, won: boolean) => void;
  updateSelfCareHabits: (habits: SessionData['selfCare']['habits']) => void;
  updateSelfCareGoals: (goals: SessionData['selfCare']['goals']) => void;
  updateEnergyLevels: (levels: SessionData['selfCare']['energyLevels']) => void;
  getDailySummary: (date?: string) => {
    totalMoodEntries: number;
    averageMood: number;
    breathingMinutes: number;
    totalBreathingCycles: number;
    gratitudeCount: number;
    writingCount: number;
    completedHabits: number;
    averageEnergy: number;
    memoryGameWins: number;
    totalMemoryGames: number;
  };
  getAvailableDates: () => string[];
}

export const useSessionStore = create<SessionStore>((set, get) => {
  const initialState = loadInitialState();
  
  const saveToStorage = (state: SessionData) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  return {
    ...initialState,

    addMoodEntry: (mood, label) => set(state => {
      const newState = {
        ...state,
        moodEntries: [...state.moodEntries, {
          timestamp: new Date().toISOString(),
          mood,
          label
        }]
      };
      saveToStorage(newState);
      return newState;
    }),

    addBreathingExercise: (duration, cycles) => set(state => {
      const newState = {
        ...state,
        breathingExercises: [...state.breathingExercises, {
          timestamp: new Date().toISOString(),
          duration,
          cycles
        }]
      };
      saveToStorage(newState);
      return newState;
    }),

    addGratitudeEntry: (content) => set(state => {
      const newState = {
        ...state,
        gratitudeEntries: [...state.gratitudeEntries, {
          id: crypto.randomUUID(),
          content,
          timestamp: new Date().toISOString()
        }]
      };
      saveToStorage(newState);
      return newState;
    }),

    removeGratitudeEntry: (id) => set(state => {
      const newState = {
        ...state,
        gratitudeEntries: state.gratitudeEntries.filter(entry => entry.id !== id)
      };
      saveToStorage(newState);
      return newState;
    }),

    addMindfulWriting: (content) => set(state => {
      const newState = {
        ...state,
        mindfulWritings: [...state.mindfulWritings, {
          id: crypto.randomUUID(),
          content,
          timestamp: new Date().toISOString()
        }]
      };
      saveToStorage(newState);
      return newState;
    }),

    removeMindfulWriting: (id) => set(state => {
      const newState = {
        ...state,
        mindfulWritings: state.mindfulWritings.filter(entry => entry.id !== id)
      };
      saveToStorage(newState);
      return newState;
    }),

    addMemoryGameResult: (moves, timeElapsed, won) => set(state => {
      const newState = {
        ...state,
        memoryGameStats: [...state.memoryGameStats, {
          timestamp: new Date().toISOString(),
          moves,
          timeElapsed,
          won
        }]
      };
      saveToStorage(newState);
      return newState;
    }),

    updateSelfCareHabits: (habits) => set(state => {
      const newState = {
        ...state,
        selfCare: {
          ...state.selfCare,
          habits: habits.map(habit => ({
            ...habit,
            timestamp: habit.timestamp || new Date().toISOString()
          }))
        }
      };
      saveToStorage(newState);
      return newState;
    }),

    updateSelfCareGoals: (goals) => set(state => {
      const newState = {
        ...state,
        selfCare: {
          ...state.selfCare,
          goals: goals.map(goal => ({
            ...goal,
            timestamp: goal.timestamp || new Date().toISOString()
          }))
        }
      };
      saveToStorage(newState);
      return newState;
    }),

    updateEnergyLevels: (levels) => set(state => {
      const newState = {
        ...state,
        selfCare: {
          ...state.selfCare,
          energyLevels: levels.map(level => ({
            ...level,
            timestamp: level.timestamp || new Date().toISOString()
          }))
        }
      };
      saveToStorage(newState);
      return newState;
    }),

    getAvailableDates: () => {
      const state = get();
      const dates = new Set<string>();

      // Collect dates from all activities
      state.moodEntries.forEach(entry => 
        dates.add(entry.timestamp.split('T')[0])
      );
      state.breathingExercises.forEach(entry => 
        dates.add(entry.timestamp.split('T')[0])
      );
      state.gratitudeEntries.forEach(entry => 
        dates.add(entry.timestamp.split('T')[0])
      );
      state.mindfulWritings.forEach(entry => 
        dates.add(entry.timestamp.split('T')[0])
      );
      state.memoryGameStats.forEach(stat => 
        dates.add(stat.timestamp.split('T')[0])
      );
      state.selfCare.habits.forEach(habit => 
        dates.add(habit.timestamp.split('T')[0])
      );
      state.selfCare.energyLevels.forEach(level => 
        dates.add(level.timestamp.split('T')[0])
      );

      // Convert to array and sort in descending order
      return Array.from(dates).sort((a, b) => b.localeCompare(a));
    },

    getDailySummary: (date = new Date().toISOString().split('T')[0]) => {
      const state = get();
      
      const todayMoodEntries = state.moodEntries.filter(entry => 
        entry.timestamp.startsWith(date)
      );

      const todayBreathingExercises = state.breathingExercises.filter(entry =>
        entry.timestamp.startsWith(date)
      );

      const todayGratitude = state.gratitudeEntries.filter(entry =>
        entry.timestamp.startsWith(date)
      );

      const todayWritings = state.mindfulWritings.filter(entry =>
        entry.timestamp.startsWith(date)
      );

      const todayMemoryGames = state.memoryGameStats.filter(stat =>
        stat.timestamp.startsWith(date)
      );

      const completedHabits = state.selfCare.habits.filter(habit =>
        habit.completed && habit.timestamp.startsWith(date)
      );

      const todayEnergyLevels = state.selfCare.energyLevels.filter(entry =>
        entry.timestamp.startsWith(date)
      );

      return {
        totalMoodEntries: todayMoodEntries.length,
        averageMood: todayMoodEntries.reduce((acc, curr) => acc + curr.mood, 0) / todayMoodEntries.length || 0,
        breathingMinutes: todayBreathingExercises.reduce((acc, curr) => acc + curr.duration, 0) / 60,
        totalBreathingCycles: todayBreathingExercises.reduce((acc, curr) => acc + curr.cycles, 0),
        gratitudeCount: todayGratitude.length,
        writingCount: todayWritings.length,
        completedHabits: completedHabits.length,
        averageEnergy: todayEnergyLevels.reduce((acc, curr) => acc + curr.level, 0) / todayEnergyLevels.length || 0,
        memoryGameWins: todayMemoryGames.filter(game => game.won).length,
        totalMemoryGames: todayMemoryGames.length
      };
    }
  };
});