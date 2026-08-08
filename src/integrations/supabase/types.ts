export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      brands: {
        Row: {
          category: string
          color: string
          created_at: string
          description: string
          id: string
          name: string
          slug: string
          sort: number
          tagline: string
          updated_at: string
        }
        Insert: {
          category?: string
          color?: string
          created_at?: string
          description?: string
          id?: string
          name: string
          slug: string
          sort?: number
          tagline?: string
          updated_at?: string
        }
        Update: {
          category?: string
          color?: string
          created_at?: string
          description?: string
          id?: string
          name?: string
          slug?: string
          sort?: number
          tagline?: string
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          a: string
          created_at: string
          id: string
          q: string
          sort: number
          updated_at: string
        }
        Insert: {
          a?: string
          created_at?: string
          id?: string
          q: string
          sort?: number
          updated_at?: string
        }
        Update: {
          a?: string
          created_at?: string
          id?: string
          q?: string
          sort?: number
          updated_at?: string
        }
        Relationships: []
      }
      industries: {
        Row: {
          accent: string
          blurb: string
          created_at: string
          icon: string
          id: string
          slug: string
          sort: number
          title: string
          updated_at: string
        }
        Insert: {
          accent?: string
          blurb?: string
          created_at?: string
          icon?: string
          id?: string
          slug: string
          sort?: number
          title: string
          updated_at?: string
        }
        Update: {
          accent?: string
          blurb?: string
          created_at?: string
          icon?: string
          id?: string
          slug?: string
          sort?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          body: string
          category: string
          created_at: string
          date: string
          excerpt: string
          id: string
          published: boolean
          read_time: string
          slug: string
          sort: number
          title: string
          updated_at: string
        }
        Insert: {
          body?: string
          category?: string
          created_at?: string
          date?: string
          excerpt?: string
          id?: string
          published?: boolean
          read_time?: string
          slug: string
          sort?: number
          title: string
          updated_at?: string
        }
        Update: {
          body?: string
          category?: string
          created_at?: string
          date?: string
          excerpt?: string
          id?: string
          published?: boolean
          read_time?: string
          slug?: string
          sort?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          client: string
          created_at: string
          id: string
          image: string
          location: string
          slug: string
          sort: number
          stats: Json
          summary: string
          title: string
          updated_at: string
          year: number
        }
        Insert: {
          category?: string
          client?: string
          created_at?: string
          id?: string
          image?: string
          location?: string
          slug: string
          sort?: number
          stats?: Json
          summary?: string
          title: string
          updated_at?: string
          year?: number
        }
        Update: {
          category?: string
          client?: string
          created_at?: string
          id?: string
          image?: string
          location?: string
          slug?: string
          sort?: number
          stats?: Json
          summary?: string
          title?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          address: string
          domain: string
          email: string
          facebook: string | null
          hours: string
          id: number
          instagram: string | null
          linkedin: string | null
          name: string
          phone: string
          short_name: string
          tagline: string
          twitter: string | null
          updated_at: string
          whatsapp: string
        }
        Insert: {
          address: string
          domain: string
          email: string
          facebook?: string | null
          hours: string
          id?: number
          instagram?: string | null
          linkedin?: string | null
          name: string
          phone: string
          short_name: string
          tagline: string
          twitter?: string | null
          updated_at?: string
          whatsapp: string
        }
        Update: {
          address?: string
          domain?: string
          email?: string
          facebook?: string | null
          hours?: string
          id?: number
          instagram?: string | null
          linkedin?: string | null
          name?: string
          phone?: string
          short_name?: string
          tagline?: string
          twitter?: string | null
          updated_at?: string
          whatsapp?: string
        }
        Relationships: []
      }
      solutions: {
        Row: {
          created_at: string
          description: string
          features: string[]
          icon: string
          id: string
          short: string
          slug: string
          sort: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          features?: string[]
          icon?: string
          id?: string
          short?: string
          slug: string
          sort?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          features?: string[]
          icon?: string
          id?: string
          short?: string
          slug?: string
          sort?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      team: {
        Row: {
          created_at: string
          id: string
          initials: string
          name: string
          role: string
          sort: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          initials?: string
          name: string
          role?: string
          sort?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          initials?: string
          name?: string
          role?: string
          sort?: number
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          company: string
          created_at: string
          id: string
          name: string
          quote: string
          rating: number
          role: string
          sort: number
          updated_at: string
        }
        Insert: {
          company?: string
          created_at?: string
          id?: string
          name: string
          quote?: string
          rating?: number
          role?: string
          sort?: number
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          id?: string
          name?: string
          quote?: string
          rating?: number
          role?: string
          sort?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "super_admin"],
    },
  },
} as const
