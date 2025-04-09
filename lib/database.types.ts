export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          completed: boolean
          due_date: string | null
          priority: number | null
          project_id: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          completed?: boolean
          due_date?: string | null
          priority?: number | null
          project_id?: string | null
          user_id?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          completed?: boolean
          due_date?: string | null
          priority?: number | null
          project_id?: string | null
          user_id?: string
        }
      }
      projects: {
        Row: {
          id: string
          created_at: string
          name: string
          color: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          color?: string | null
          user_id?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          color?: string | null
          user_id?: string
        }
      }
      labels: {
        Row: {
          id: string
          created_at: string
          name: string
          color: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          color?: string | null
          user_id?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          color?: string | null
          user_id?: string
        }
      }
      task_labels: {
        Row: {
          id: string
          task_id: string
          label_id: string
        }
        Insert: {
          id?: string
          task_id: string
          label_id: string
        }
        Update: {
          id?: string
          task_id?: string
          label_id?: string
        }
      }
    }
  }
}
