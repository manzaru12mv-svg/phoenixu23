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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      gallery: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string
          sort_order: number
          title: string | null
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          sort_order?: number
          title?: string | null
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          sort_order?: number
          title?: string | null
        }
        Relationships: []
      }
      goals: {
        Row: {
          assist_player_id: string | null
          created_at: string
          id: string
          is_own_goal: boolean
          is_penalty: boolean
          match_id: string
          minute: number | null
          player_id: string | null
          team_id: string | null
        }
        Insert: {
          assist_player_id?: string | null
          created_at?: string
          id?: string
          is_own_goal?: boolean
          is_penalty?: boolean
          match_id: string
          minute?: number | null
          player_id?: string | null
          team_id?: string | null
        }
        Update: {
          assist_player_id?: string | null
          created_at?: string
          id?: string
          is_own_goal?: boolean
          is_penalty?: boolean
          match_id?: string
          minute?: number | null
          player_id?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "goals_assist_player_id_fkey"
            columns: ["assist_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goals_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goals_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goals_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          away_score: number | null
          away_team_id: string | null
          created_at: string
          group_label: string | null
          home_score: number | null
          home_team_id: string | null
          id: string
          kickoff_at: string | null
          minute: number | null
          mvp_player_id: string | null
          notes: string | null
          round_label: string | null
          stage: Database["public"]["Enums"]["match_stage"]
          status: Database["public"]["Enums"]["match_status"]
          updated_at: string
          venue: string | null
        }
        Insert: {
          away_score?: number | null
          away_team_id?: string | null
          created_at?: string
          group_label?: string | null
          home_score?: number | null
          home_team_id?: string | null
          id?: string
          kickoff_at?: string | null
          minute?: number | null
          mvp_player_id?: string | null
          notes?: string | null
          round_label?: string | null
          stage?: Database["public"]["Enums"]["match_stage"]
          status?: Database["public"]["Enums"]["match_status"]
          updated_at?: string
          venue?: string | null
        }
        Update: {
          away_score?: number | null
          away_team_id?: string | null
          created_at?: string
          group_label?: string | null
          home_score?: number | null
          home_team_id?: string | null
          id?: string
          kickoff_at?: string | null
          minute?: number | null
          mvp_player_id?: string | null
          notes?: string | null
          round_label?: string | null
          stage?: Database["public"]["Enums"]["match_stage"]
          status?: Database["public"]["Enums"]["match_status"]
          updated_at?: string
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_away_team_id_fkey"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_home_team_id_fkey"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_mvp_player_id_fkey"
            columns: ["mvp_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          author: string | null
          body: string | null
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_published: boolean
          published_at: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          body?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          published_at?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          body?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          published_at?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      players: {
        Row: {
          appearances: number
          assists: number
          bio: string | null
          clean_sheets: number
          created_at: string
          date_of_birth: string | null
          goals: number
          id: string
          is_captain: boolean
          jersey_number: number | null
          name: string
          nationality: string | null
          photo_url: string | null
          position: Database["public"]["Enums"]["player_position"] | null
          red_cards: number
          team_id: string | null
          updated_at: string
          yellow_cards: number
        }
        Insert: {
          appearances?: number
          assists?: number
          bio?: string | null
          clean_sheets?: number
          created_at?: string
          date_of_birth?: string | null
          goals?: number
          id?: string
          is_captain?: boolean
          jersey_number?: number | null
          name: string
          nationality?: string | null
          photo_url?: string | null
          position?: Database["public"]["Enums"]["player_position"] | null
          red_cards?: number
          team_id?: string | null
          updated_at?: string
          yellow_cards?: number
        }
        Update: {
          appearances?: number
          assists?: number
          bio?: string | null
          clean_sheets?: number
          created_at?: string
          date_of_birth?: string | null
          goals?: number
          id?: string
          is_captain?: boolean
          jersey_number?: number | null
          name?: string
          nationality?: string | null
          photo_url?: string | null
          position?: Database["public"]["Enums"]["player_position"] | null
          red_cards?: number
          team_id?: string | null
          updated_at?: string
          yellow_cards?: number
        }
        Relationships: [
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          about: string | null
          contact_email: string | null
          created_at: string
          end_date: string | null
          facebook_url: string | null
          hero_image_url: string | null
          id: string
          instagram_url: string | null
          logo_url: string | null
          start_date: string | null
          tagline: string | null
          tournament_name: string
          twitter_url: string | null
          updated_at: string
          venue: string | null
          youtube_url: string | null
        }
        Insert: {
          about?: string | null
          contact_email?: string | null
          created_at?: string
          end_date?: string | null
          facebook_url?: string | null
          hero_image_url?: string | null
          id?: string
          instagram_url?: string | null
          logo_url?: string | null
          start_date?: string | null
          tagline?: string | null
          tournament_name?: string
          twitter_url?: string | null
          updated_at?: string
          venue?: string | null
          youtube_url?: string | null
        }
        Update: {
          about?: string | null
          contact_email?: string | null
          created_at?: string
          end_date?: string | null
          facebook_url?: string | null
          hero_image_url?: string | null
          id?: string
          instagram_url?: string | null
          logo_url?: string | null
          start_date?: string | null
          tagline?: string | null
          tournament_name?: string
          twitter_url?: string | null
          updated_at?: string
          venue?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      sponsors: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          sort_order: number
          tier: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          sort_order?: number
          tier?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          sort_order?: number
          tier?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          coach: string | null
          created_at: string
          description: string | null
          group_label: string | null
          home_city: string | null
          id: string
          logo_url: string | null
          name: string
          primary_color: string | null
          secondary_color: string | null
          short_name: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          coach?: string | null
          created_at?: string
          description?: string | null
          group_label?: string | null
          home_city?: string | null
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string | null
          secondary_color?: string | null
          short_name?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          coach?: string | null
          created_at?: string
          description?: string | null
          group_label?: string | null
          home_city?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          secondary_color?: string | null
          short_name?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      match_stage:
        | "group"
        | "round_of_16"
        | "quarter_final"
        | "semi_final"
        | "third_place"
        | "final"
      match_status:
        | "scheduled"
        | "live"
        | "half_time"
        | "finished"
        | "postponed"
      player_position:
        | "GK"
        | "DEF"
        | "MID"
        | "FWD"
        | "PIVOT"
        | "WINGER"
        | "UNIVERSAL"
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
      match_stage: [
        "group",
        "round_of_16",
        "quarter_final",
        "semi_final",
        "third_place",
        "final",
      ],
      match_status: ["scheduled", "live", "half_time", "finished", "postponed"],
      player_position: [
        "GK",
        "DEF",
        "MID",
        "FWD",
        "PIVOT",
        "WINGER",
        "UNIVERSAL",
      ],
    },
  },
} as const
