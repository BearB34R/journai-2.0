export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      mood_entries: {
        Row: {
          id: string
          created_at: string
          user_id: string
          mood_score: number
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          mood_score: number
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          mood_score?: number
          notes?: string | null
        }
      }
      journal_entries: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          content: string
          mood_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          content: string
          mood_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          content?: string
          mood_id?: string | null
        }
      }
      wellness_activities: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          category: string
          duration_minutes: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          category: string
          duration_minutes: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          category?: string
          duration_minutes?: number
        }
      }
      user_activities: {
        Row: {
          id: string
          created_at: string
          user_id: string
          activity_id: string
          completed_at: string
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          activity_id: string
          completed_at: string
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          activity_id?: string
          completed_at?: string
          notes?: string | null
        }
      }
      user_profiles: {
        Row: {
          id: string
          created_at: string
          user_id: string
          full_name: string | null
          avatar_url: string | null
          wellness_goals: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          full_name?: string | null
          avatar_url?: string | null
          wellness_goals?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          full_name?: string | null
          avatar_url?: string | null
          wellness_goals?: string[] | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
