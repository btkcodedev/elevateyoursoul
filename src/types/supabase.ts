export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
          preferences: {
            theme: string;
            language: string;
            notifications: boolean;
          } | null;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          preferences?: {
            theme: string;
            language: string;
            notifications: boolean;
          } | null;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          preferences?: {
            theme: string;
            language: string;
            notifications: boolean;
          } | null;
        };
      };
      user_data: {
        Row: {
          id: string;
          user_id: string;
          mood_entries: {
            timestamp: string;
            mood: number;
            note: string;
          }[];
          habits: {
            id: string;
            label: string;
            completed: boolean;
            created_at: string;
          }[];
          goals: {
            id: string;
            title: string;
            progress: number;
            created_at: string;
          }[];
          gratitude_entries: {
            id: string;
            content: string;
            created_at: string;
          }[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          mood_entries?: {
            timestamp: string;
            mood: number;
            note: string;
          }[];
          habits?: {
            id: string;
            label: string;
            completed: boolean;
            created_at: string;
          }[];
          goals?: {
            id: string;
            title: string;
            progress: number;
            created_at: string;
          }[];
          gratitude_entries?: {
            id: string;
            content: string;
            created_at: string;
          }[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          mood_entries?: {
            timestamp: string;
            mood: number;
            note: string;
          }[];
          habits?: {
            id: string;
            label: string;
            completed: boolean;
            created_at: string;
          }[];
          goals?: {
            id: string;
            title: string;
            progress: number;
            created_at: string;
          }[];
          gratitude_entries?: {
            id: string;
            content: string;
            created_at: string;
          }[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}