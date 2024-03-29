export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      app_admins: {
        Row: {
          role: Database["public"]["Enums"]["app_admin_role"] | null;
          user_id: string;
        };
        Insert: {
          role?: Database["public"]["Enums"]["app_admin_role"] | null;
          user_id: string;
        };
        Update: {
          role?: Database["public"]["Enums"]["app_admin_role"] | null;
          user_id?: string;
        };
        Relationships: [];
      };
      app_settings: {
        Row: {
          id: number;
          maintenance_message: string | null;
          maintenance_status:
            | Database["public"]["Enums"]["maintenance_status"]
            | null;
          scheduled_maintenance_ends_at: string | null;
        };
        Insert: {
          id?: number;
          maintenance_message?: string | null;
          maintenance_status?:
            | Database["public"]["Enums"]["maintenance_status"]
            | null;
          scheduled_maintenance_ends_at?: string | null;
        };
        Update: {
          id?: number;
          maintenance_message?: string | null;
          maintenance_status?:
            | Database["public"]["Enums"]["maintenance_status"]
            | null;
          scheduled_maintenance_ends_at?: string | null;
        };
        Relationships: [];
      };
      bookmarked_organizations: {
        Row: {
          created_at: string;
          id: string;
          organization_id: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          organization_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          organization_id?: string;
        };
        Relationships: [];
      };
      claimed_tasks: {
        Row: {
          created_at: string;
          task_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          task_id?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          task_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_claimed_tasks_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_claimed_tasks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      contributions: {
        Row: {
          created_at: string;
          description: string;
          files: Json;
          id: string;
          links: Json;
          task_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          files: Json;
          id?: string;
          links: Json;
          task_id?: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          files?: Json;
          id?: string;
          links?: Json;
          task_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_contributions_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_contributions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      customers: {
        Row: {
          organization_id: string;
          stripe_customer_id: string;
        };
        Insert: {
          organization_id: string;
          stripe_customer_id: string;
        };
        Update: {
          organization_id?: string;
          stripe_customer_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "customers_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      freezed_milestones: {
        Row: {
          created_at: string;
          milestone_id: string;
        };
        Insert: {
          created_at?: string;
          milestone_id?: string;
        };
        Update: {
          created_at?: string;
          milestone_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_freezed_milestones_milestone_id_fkey";
            columns: ["milestone_id"];
            isOneToOne: true;
            referencedRelation: "grant_project_milestones_2";
            referencedColumns: ["id"];
          }
        ];
      };
      freezed_tasks: {
        Row: {
          created_at: string;
          task_id: string;
        };
        Insert: {
          created_at?: string;
          task_id?: string;
        };
        Update: {
          created_at?: string;
          task_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_freezed_tasks_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: true;
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          }
        ];
      };
      grant_applications: {
        Row: {
          claim_stake_amount_percentage: number | null;
          created_at: string;
          description: string;
          efforts: number | null;
          files: Json | null;
          grant_amount: number;
          grant_community: string | null;
          grant_project_status: Database["public"]["Enums"]["grant_project_status"];
          grant_project_types: Json | null;
          id: string;
          is_grant_published: boolean;
          name: string;
          new_grant_project_created_at: string;
          organization_id: string;
          prioritization_period: number | null;
          prioritization_quorum_percentage: number;
          prioritization_reward_percentage: number | null;
          project_status: Database["public"]["Enums"]["project_status"];
          rewards: number | null;
          team_id: number | null;
          updated_at: string;
          user_id: string | null;
          validation_qourum_percentage: number | null;
          validation_reward_percentage: number | null;
        };
        Insert: {
          claim_stake_amount_percentage?: number | null;
          created_at?: string;
          description: string;
          efforts?: number | null;
          files?: Json | null;
          grant_amount: number;
          grant_community?: string | null;
          grant_project_status: Database["public"]["Enums"]["grant_project_status"];
          grant_project_types?: Json | null;
          id?: string;
          is_grant_published?: boolean;
          name: string;
          new_grant_project_created_at: string;
          organization_id: string;
          prioritization_period?: number | null;
          prioritization_quorum_percentage: number;
          prioritization_reward_percentage?: number | null;
          project_status?: Database["public"]["Enums"]["project_status"];
          rewards?: number | null;
          team_id?: number | null;
          updated_at?: string;
          user_id?: string | null;
          validation_qourum_percentage?: number | null;
          validation_reward_percentage?: number | null;
        };
        Update: {
          claim_stake_amount_percentage?: number | null;
          created_at?: string;
          description?: string;
          efforts?: number | null;
          files?: Json | null;
          grant_amount?: number;
          grant_community?: string | null;
          grant_project_status?: Database["public"]["Enums"]["grant_project_status"];
          grant_project_types?: Json | null;
          id?: string;
          is_grant_published?: boolean;
          name?: string;
          new_grant_project_created_at?: string;
          organization_id?: string;
          prioritization_period?: number | null;
          prioritization_quorum_percentage?: number;
          prioritization_reward_percentage?: number | null;
          project_status?: Database["public"]["Enums"]["project_status"];
          rewards?: number | null;
          team_id?: number | null;
          updated_at?: string;
          user_id?: string | null;
          validation_qourum_percentage?: number | null;
          validation_reward_percentage?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_grant_applications_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "grant_programs";
            referencedColumns: ["id"];
          }
        ];
      };
      grant_programs: {
        Row: {
          active_tasks: number | null;
          addresses_with_veto: string | null;
          carrot_pot_initial_amount: number | null;
          claim_lock_period_duration: unknown | null;
          claim_stake_amount_percentage: number | null;
          community_fee_percentage: number | null;
          contribution_period: number | null;
          created_at: string;
          created_by: string;
          description: string | null;
          facebook_url: string | null;
          grant_image: string | null;
          grant_pool: number;
          id: string;
          instagram_url: string | null;
          linkedin_url: string | null;
          location: string | null;
          prioritization_period: number | null;
          prioritization_quorum_percentage: number;
          prioritization_reward_percentage: number | null;
          proposal_absolute_reward: number | null;
          slash_percentage: number;
          task_expiration_time: string | null;
          title: string;
          total_members: number | null;
          total_tasks: number | null;
          twitter_url: string | null;
          validation_period: number | null;
          validation_quorum_percentage: number | null;
          validation_reward_percentage: number | null;
          website_url: string | null;
          youtube_url: string | null;
        };
        Insert: {
          active_tasks?: number | null;
          addresses_with_veto?: string | null;
          carrot_pot_initial_amount?: number | null;
          claim_lock_period_duration?: unknown | null;
          claim_stake_amount_percentage?: number | null;
          community_fee_percentage?: number | null;
          contribution_period?: number | null;
          created_at?: string;
          created_by: string;
          description?: string | null;
          facebook_url?: string | null;
          grant_image?: string | null;
          grant_pool: number;
          id?: string;
          instagram_url?: string | null;
          linkedin_url?: string | null;
          location?: string | null;
          prioritization_period?: number | null;
          prioritization_quorum_percentage: number;
          prioritization_reward_percentage?: number | null;
          proposal_absolute_reward?: number | null;
          slash_percentage: number;
          task_expiration_time?: string | null;
          title: string;
          total_members?: number | null;
          total_tasks?: number | null;
          twitter_url?: string | null;
          validation_period?: number | null;
          validation_quorum_percentage?: number | null;
          validation_reward_percentage?: number | null;
          website_url?: string | null;
          youtube_url?: string | null;
        };
        Update: {
          active_tasks?: number | null;
          addresses_with_veto?: string | null;
          carrot_pot_initial_amount?: number | null;
          claim_lock_period_duration?: unknown | null;
          claim_stake_amount_percentage?: number | null;
          community_fee_percentage?: number | null;
          contribution_period?: number | null;
          created_at?: string;
          created_by?: string;
          description?: string | null;
          facebook_url?: string | null;
          grant_image?: string | null;
          grant_pool?: number;
          id?: string;
          instagram_url?: string | null;
          linkedin_url?: string | null;
          location?: string | null;
          prioritization_period?: number | null;
          prioritization_quorum_percentage?: number;
          prioritization_reward_percentage?: number | null;
          proposal_absolute_reward?: number | null;
          slash_percentage?: number;
          task_expiration_time?: string | null;
          title?: string;
          total_members?: number | null;
          total_tasks?: number | null;
          twitter_url?: string | null;
          validation_period?: number | null;
          validation_quorum_percentage?: number | null;
          validation_reward_percentage?: number | null;
          website_url?: string | null;
          youtube_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_grant_programs_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      grant_project_all_types: {
        Row: {
          description: string;
          id: number;
          name: string;
          slug: string;
        };
        Insert: {
          description: string;
          id?: number;
          name: string;
          slug: string;
        };
        Update: {
          description?: string;
          id?: number;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      grant_project_claimed_milestones: {
        Row: {
          created_at: string;
          milestone_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          milestone_id?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          milestone_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_grant_project_claimed_milestones_milestone_id_fkey";
            columns: ["milestone_id"];
            isOneToOne: false;
            referencedRelation: "grant_project_milestones_2";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_grant_project_claimed_milestones_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      grant_project_milestone_prioritizations: {
        Row: {
          count: number;
          created_at: string;
          grant_project_milestone_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          count: number;
          created_at?: string;
          grant_project_milestone_id?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          count?: number;
          created_at?: string;
          grant_project_milestone_id?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_grant_project_milestone_prioritizations_grant_project_mi";
            columns: ["grant_project_milestone_id"];
            isOneToOne: false;
            referencedRelation: "grant_project_milestones_2";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_grant_project_milestone_prioritizations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      grant_project_milestone_validations: {
        Row: {
          contribution_id: string;
          count: number;
          created_at: string;
          description: string;
          files: Json;
          grant_project_milestone_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          contribution_id?: string;
          count: number;
          created_at?: string;
          description: string;
          files: Json;
          grant_project_milestone_id?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          contribution_id?: string;
          count?: number;
          created_at?: string;
          description?: string;
          files?: Json;
          grant_project_milestone_id?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_grant_project_milestone_validations_contribution_id_fkey";
            columns: ["contribution_id"];
            isOneToOne: false;
            referencedRelation: "grant_project_milestones_contributions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_grant_project_milestone_validations_grant_project_milest";
            columns: ["grant_project_milestone_id"];
            isOneToOne: false;
            referencedRelation: "grant_project_milestones_2";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_grant_project_milestone_validations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      grant_project_milestones: {
        Row: {
          budget: number;
          created_at: string;
          description: string;
          effort: number;
          grant_project_id: string;
          id: number;
          title: string;
        };
        Insert: {
          budget: number;
          created_at?: string;
          description: string;
          effort: number;
          grant_project_id?: string;
          id?: number;
          title: string;
        };
        Update: {
          budget?: number;
          created_at?: string;
          description?: string;
          effort?: number;
          grant_project_id?: string;
          id?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_grant_project_milestones_grant_project_id_fkey";
            columns: ["grant_project_id"];
            isOneToOne: false;
            referencedRelation: "grant_applications";
            referencedColumns: ["id"];
          }
        ];
      };
      grant_project_milestones_2: {
        Row: {
          created_at: string;
          description: string;
          efforts: number | null;
          files: Json | null;
          grant_community: string | null;
          grant_project_id: string;
          grant_project_milestone_amount: number;
          grant_project_milestone_status: Database["public"]["Enums"]["task_status"];
          grant_project_milestone_types: Json;
          id: string;
          is_milestone_published: boolean;
          name: string;
          new_grant_project_milestone_created_at: string;
          project_status: Database["public"]["Enums"]["project_status"];
          rewards: number;
          team_id: number | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          description: string;
          efforts?: number | null;
          files?: Json | null;
          grant_community?: string | null;
          grant_project_id: string;
          grant_project_milestone_amount: number;
          grant_project_milestone_status: Database["public"]["Enums"]["task_status"];
          grant_project_milestone_types: Json;
          id?: string;
          is_milestone_published?: boolean;
          name: string;
          new_grant_project_milestone_created_at: string;
          project_status?: Database["public"]["Enums"]["project_status"];
          rewards: number;
          team_id?: number | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string;
          efforts?: number | null;
          files?: Json | null;
          grant_community?: string | null;
          grant_project_id?: string;
          grant_project_milestone_amount?: number;
          grant_project_milestone_status?: Database["public"]["Enums"]["task_status"];
          grant_project_milestone_types?: Json;
          id?: string;
          is_milestone_published?: boolean;
          name?: string;
          new_grant_project_milestone_created_at?: string;
          project_status?: Database["public"]["Enums"]["project_status"];
          rewards?: number;
          team_id?: number | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_grant_project_milestones_2_grant_project_id_fkey";
            columns: ["grant_project_id"];
            isOneToOne: false;
            referencedRelation: "grant_applications";
            referencedColumns: ["id"];
          }
        ];
      };
      grant_project_milestones_contributions: {
        Row: {
          created_at: string;
          description: string;
          files: Json;
          grant_project_milestone_id: string;
          id: string;
          links: Json;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          files: Json;
          grant_project_milestone_id?: string;
          id?: string;
          links: Json;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          files?: Json;
          grant_project_milestone_id?: string;
          id?: string;
          links?: Json;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_grant_project_milestones_contributions_grant_project_mil";
            columns: ["grant_project_milestone_id"];
            isOneToOne: false;
            referencedRelation: "grant_project_milestones_2";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_grant_project_milestones_contributions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      grant_project_prioritizations: {
        Row: {
          count: number;
          created_at: string;
          grant_project_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          count: number;
          created_at?: string;
          grant_project_id?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          count?: number;
          created_at?: string;
          grant_project_id?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_grant_project_prioritizations_grant_project_id_fkey";
            columns: ["grant_project_id"];
            isOneToOne: false;
            referencedRelation: "grant_applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_grant_project_prioritizations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      grants_private_info: {
        Row: {
          active_tasks: number | null;
          addresses_with_veto: string | null;
          billing_address: Json | null;
          carrot_pot_initial_amount: number | null;
          claim_lock_period_duration: unknown | null;
          claim_stake_amount_percentage: number | null;
          community_fee_percentage: number | null;
          community_live_status:
            | Database["public"]["Enums"]["community_live_status_enum"]
            | null;
          community_token: string | null;
          contribution_period_duration: unknown | null;
          id: string;
          location: string | null;
          payment_method: Json | null;
          prioritization_period_duration: unknown | null;
          prioritization_period_start: string | null;
          prioritization_quorum_percentage: number | null;
          prioritization_reward_percentage: number | null;
          proposal_absolute_reward: number | null;
          proposal_relative_reward: number | null;
          task_expiration_time: string | null;
          total_members: number | null;
          total_tasks: number | null;
          user_roles: Json | null;
          validation_period_duration: unknown | null;
          validation_quorum_percentage: number | null;
          validation_reward_percentage: number | null;
        };
        Insert: {
          active_tasks?: number | null;
          addresses_with_veto?: string | null;
          billing_address?: Json | null;
          carrot_pot_initial_amount?: number | null;
          claim_lock_period_duration?: unknown | null;
          claim_stake_amount_percentage?: number | null;
          community_fee_percentage?: number | null;
          community_live_status?:
            | Database["public"]["Enums"]["community_live_status_enum"]
            | null;
          community_token?: string | null;
          contribution_period_duration?: unknown | null;
          id: string;
          location?: string | null;
          payment_method?: Json | null;
          prioritization_period_duration?: unknown | null;
          prioritization_period_start?: string | null;
          prioritization_quorum_percentage?: number | null;
          prioritization_reward_percentage?: number | null;
          proposal_absolute_reward?: number | null;
          proposal_relative_reward?: number | null;
          task_expiration_time?: string | null;
          total_members?: number | null;
          total_tasks?: number | null;
          user_roles?: Json | null;
          validation_period_duration?: unknown | null;
          validation_quorum_percentage?: number | null;
          validation_reward_percentage?: number | null;
        };
        Update: {
          active_tasks?: number | null;
          addresses_with_veto?: string | null;
          billing_address?: Json | null;
          carrot_pot_initial_amount?: number | null;
          claim_lock_period_duration?: unknown | null;
          claim_stake_amount_percentage?: number | null;
          community_fee_percentage?: number | null;
          community_live_status?:
            | Database["public"]["Enums"]["community_live_status_enum"]
            | null;
          community_token?: string | null;
          contribution_period_duration?: unknown | null;
          id?: string;
          location?: string | null;
          payment_method?: Json | null;
          prioritization_period_duration?: unknown | null;
          prioritization_period_start?: string | null;
          prioritization_quorum_percentage?: number | null;
          prioritization_reward_percentage?: number | null;
          proposal_absolute_reward?: number | null;
          proposal_relative_reward?: number | null;
          task_expiration_time?: string | null;
          total_members?: number | null;
          total_tasks?: number | null;
          user_roles?: Json | null;
          validation_period_duration?: unknown | null;
          validation_quorum_percentage?: number | null;
          validation_reward_percentage?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_grants_private_info_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      internal_blog_author_posts: {
        Row: {
          author_id: string;
          post_id: string;
        };
        Insert: {
          author_id: string;
          post_id: string;
        };
        Update: {
          author_id?: string;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "internal_blog_author_posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "internal_blog_author_profiles";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "internal_blog_author_posts_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "internal_blog_posts";
            referencedColumns: ["id"];
          }
        ];
      };
      internal_blog_author_profiles: {
        Row: {
          avatar_url: string;
          bio: string;
          created_at: string;
          display_name: string;
          facebook_handle: string | null;
          instagram_handle: string | null;
          linkedin_handle: string | null;
          twitter_handle: string | null;
          updated_at: string;
          user_id: string;
          website_url: string | null;
        };
        Insert: {
          avatar_url: string;
          bio: string;
          created_at?: string;
          display_name: string;
          facebook_handle?: string | null;
          instagram_handle?: string | null;
          linkedin_handle?: string | null;
          twitter_handle?: string | null;
          updated_at?: string;
          user_id: string;
          website_url?: string | null;
        };
        Update: {
          avatar_url?: string;
          bio?: string;
          created_at?: string;
          display_name?: string;
          facebook_handle?: string | null;
          instagram_handle?: string | null;
          linkedin_handle?: string | null;
          twitter_handle?: string | null;
          updated_at?: string;
          user_id?: string;
          website_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "internal_blog_author_profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      internal_blog_post_tags: {
        Row: {
          description: string | null;
          id: number;
          name: string;
          slug: string;
        };
        Insert: {
          description?: string | null;
          id?: never;
          name: string;
          slug: string;
        };
        Update: {
          description?: string | null;
          id?: never;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      internal_blog_post_tags_relationship: {
        Row: {
          blog_post_id: string;
          tag_id: number;
        };
        Insert: {
          blog_post_id: string;
          tag_id: number;
        };
        Update: {
          blog_post_id?: string;
          tag_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "internal_blog_post_tags_relationship_blog_post_id_fkey";
            columns: ["blog_post_id"];
            isOneToOne: false;
            referencedRelation: "internal_blog_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "internal_blog_post_tags_relationship_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "internal_blog_post_tags";
            referencedColumns: ["id"];
          }
        ];
      };
      internal_blog_posts: {
        Row: {
          content: string;
          cover_image: string | null;
          created_at: string;
          id: string;
          is_featured: boolean;
          seo_data: Json | null;
          slug: string;
          status: Database["public"]["Enums"]["internal_blog_post_status"];
          summary: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          content: string;
          cover_image?: string | null;
          created_at?: string;
          id?: string;
          is_featured?: boolean;
          seo_data?: Json | null;
          slug: string;
          status?: Database["public"]["Enums"]["internal_blog_post_status"];
          summary: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          cover_image?: string | null;
          created_at?: string;
          id?: string;
          is_featured?: boolean;
          seo_data?: Json | null;
          slug?: string;
          status?: Database["public"]["Enums"]["internal_blog_post_status"];
          summary?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      internal_changelog: {
        Row: {
          changes: string;
          created_at: string | null;
          id: string;
          title: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          changes: string;
          created_at?: string | null;
          id?: string;
          title: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          changes?: string;
          created_at?: string | null;
          id?: string;
          title?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "internal_changelog_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      internal_feedback_comments: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          thread_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          thread_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          thread_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "internal_feedback_comments_thread_id_fkey";
            columns: ["thread_id"];
            isOneToOne: false;
            referencedRelation: "internal_feedback_threads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "internal_feedback_comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      internal_feedback_threads: {
        Row: {
          added_to_roadmap: boolean;
          content: string;
          created_at: string;
          id: string;
          open_for_public_discussion: boolean;
          priority: Database["public"]["Enums"]["internal_feedback_thread_priority"];
          status: Database["public"]["Enums"]["internal_feedback_thread_status"];
          title: string;
          type: Database["public"]["Enums"]["internal_feedback_thread_type"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          added_to_roadmap?: boolean;
          content: string;
          created_at?: string;
          id?: string;
          open_for_public_discussion?: boolean;
          priority?: Database["public"]["Enums"]["internal_feedback_thread_priority"];
          status?: Database["public"]["Enums"]["internal_feedback_thread_status"];
          title: string;
          type?: Database["public"]["Enums"]["internal_feedback_thread_type"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          added_to_roadmap?: boolean;
          content?: string;
          created_at?: string;
          id?: string;
          open_for_public_discussion?: boolean;
          priority?: Database["public"]["Enums"]["internal_feedback_thread_priority"];
          status?: Database["public"]["Enums"]["internal_feedback_thread_status"];
          title?: string;
          type?: Database["public"]["Enums"]["internal_feedback_thread_type"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "internal_feedback_threads_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      organization_credits: {
        Row: {
          credits: number;
          organization_id: string;
        };
        Insert: {
          credits?: number;
          organization_id: string;
        };
        Update: {
          credits?: number;
          organization_id?: string;
        };
        Relationships: [];
      };
      organization_join_invitations: {
        Row: {
          created_at: string;
          id: string;
          invitee_organization_role: Database["public"]["Enums"]["organization_member_role"];
          invitee_user_email: string;
          invitee_user_id: string | null;
          inviter_user_id: string;
          organization_id: string;
          status: Database["public"]["Enums"]["organization_join_invitation_link_status"];
        };
        Insert: {
          created_at?: string;
          id?: string;
          invitee_organization_role?: Database["public"]["Enums"]["organization_member_role"];
          invitee_user_email: string;
          invitee_user_id?: string | null;
          inviter_user_id: string;
          organization_id: string;
          status?: Database["public"]["Enums"]["organization_join_invitation_link_status"];
        };
        Update: {
          created_at?: string;
          id?: string;
          invitee_organization_role?: Database["public"]["Enums"]["organization_member_role"];
          invitee_user_email?: string;
          invitee_user_id?: string | null;
          inviter_user_id?: string;
          organization_id?: string;
          status?: Database["public"]["Enums"]["organization_join_invitation_link_status"];
        };
        Relationships: [
          {
            foreignKeyName: "public_organization_join_invitations_invitee_user_id_fkey";
            columns: ["invitee_user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_organization_join_invitations_inviter_user_id_fkey";
            columns: ["inviter_user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_organization_join_invitations_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      organization_members: {
        Row: {
          created_at: string;
          id: number;
          member_id: string;
          member_role: Database["public"]["Enums"]["organization_member_role"];
          organization_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          member_id: string;
          member_role: Database["public"]["Enums"]["organization_member_role"];
          organization_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          member_id?: string;
          member_role?: Database["public"]["Enums"]["organization_member_role"];
          organization_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_organization_members_member_id_fkey";
            columns: ["member_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_organization_members_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      organizations: {
        Row: {
          active_tasks: number | null;
          addresses_with_veto: string | null;
          carrot_pot_initial_amount: number | null;
          claim_lock_period_duration: unknown | null;
          claim_stake_amount_percentage: number | null;
          community_fee_percentage: number | null;
          community_image: string | null;
          contribution_period: number | null;
          created_at: string;
          created_by: string;
          description: string | null;
          facebook_url: string | null;
          id: string;
          instagram_url: string | null;
          linkedin_url: string | null;
          location: string | null;
          prioritization_period: number | null;
          prioritization_quorum_percentage: number | null;
          prioritization_reward_percentage: number | null;
          proposal_absolute_reward: number | null;
          task_expiration_time: string | null;
          title: string;
          total_members: number | null;
          total_tasks: number | null;
          twitter_url: string | null;
          validation_period: number | null;
          validation_quorum_percentage: number | null;
          validation_reward_percentage: number | null;
          website_url: string | null;
          youtube_url: string | null;
        };
        Insert: {
          active_tasks?: number | null;
          addresses_with_veto?: string | null;
          carrot_pot_initial_amount?: number | null;
          claim_lock_period_duration?: unknown | null;
          claim_stake_amount_percentage?: number | null;
          community_fee_percentage?: number | null;
          community_image?: string | null;
          contribution_period?: number | null;
          created_at?: string;
          created_by: string;
          description?: string | null;
          facebook_url?: string | null;
          id?: string;
          instagram_url?: string | null;
          linkedin_url?: string | null;
          location?: string | null;
          prioritization_period?: number | null;
          prioritization_quorum_percentage?: number | null;
          prioritization_reward_percentage?: number | null;
          proposal_absolute_reward?: number | null;
          task_expiration_time?: string | null;
          title?: string;
          total_members?: number | null;
          total_tasks?: number | null;
          twitter_url?: string | null;
          validation_period?: number | null;
          validation_quorum_percentage?: number | null;
          validation_reward_percentage?: number | null;
          website_url?: string | null;
          youtube_url?: string | null;
        };
        Update: {
          active_tasks?: number | null;
          addresses_with_veto?: string | null;
          carrot_pot_initial_amount?: number | null;
          claim_lock_period_duration?: unknown | null;
          claim_stake_amount_percentage?: number | null;
          community_fee_percentage?: number | null;
          community_image?: string | null;
          contribution_period?: number | null;
          created_at?: string;
          created_by?: string;
          description?: string | null;
          facebook_url?: string | null;
          id?: string;
          instagram_url?: string | null;
          linkedin_url?: string | null;
          location?: string | null;
          prioritization_period?: number | null;
          prioritization_quorum_percentage?: number | null;
          prioritization_reward_percentage?: number | null;
          proposal_absolute_reward?: number | null;
          task_expiration_time?: string | null;
          title?: string;
          total_members?: number | null;
          total_tasks?: number | null;
          twitter_url?: string | null;
          validation_period?: number | null;
          validation_quorum_percentage?: number | null;
          validation_reward_percentage?: number | null;
          website_url?: string | null;
          youtube_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_organizations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      organizations_private_info: {
        Row: {
          active_tasks: number | null;
          addresses_with_veto: string | null;
          billing_address: Json | null;
          carrot_pot_initial_amount: number | null;
          claim_lock_period_duration: unknown | null;
          claim_stake_amount_percentage: number | null;
          community_fee_percentage: number | null;
          community_live_status:
            | Database["public"]["Enums"]["community_live_status_enum"]
            | null;
          community_token: string | null;
          contribution_period_duration: unknown | null;
          id: string;
          location: string | null;
          payment_method: Json | null;
          prioritization_period_duration: unknown | null;
          prioritization_period_start: string | null;
          prioritization_quorum_percentage: number | null;
          prioritization_reward_percentage: number | null;
          proposal_absolute_reward: number | null;
          proposal_relative_reward: number | null;
          task_expiration_time: string | null;
          total_members: number | null;
          total_tasks: number | null;
          user_roles: Json | null;
          validation_period_duration: unknown | null;
          validation_quorum_percentage: number | null;
          validation_reward_percentage: number | null;
        };
        Insert: {
          active_tasks?: number | null;
          addresses_with_veto?: string | null;
          billing_address?: Json | null;
          carrot_pot_initial_amount?: number | null;
          claim_lock_period_duration?: unknown | null;
          claim_stake_amount_percentage?: number | null;
          community_fee_percentage?: number | null;
          community_live_status?:
            | Database["public"]["Enums"]["community_live_status_enum"]
            | null;
          community_token?: string | null;
          contribution_period_duration?: unknown | null;
          id: string;
          location?: string | null;
          payment_method?: Json | null;
          prioritization_period_duration?: unknown | null;
          prioritization_period_start?: string | null;
          prioritization_quorum_percentage?: number | null;
          prioritization_reward_percentage?: number | null;
          proposal_absolute_reward?: number | null;
          proposal_relative_reward?: number | null;
          task_expiration_time?: string | null;
          total_members?: number | null;
          total_tasks?: number | null;
          user_roles?: Json | null;
          validation_period_duration?: unknown | null;
          validation_quorum_percentage?: number | null;
          validation_reward_percentage?: number | null;
        };
        Update: {
          active_tasks?: number | null;
          addresses_with_veto?: string | null;
          billing_address?: Json | null;
          carrot_pot_initial_amount?: number | null;
          claim_lock_period_duration?: unknown | null;
          claim_stake_amount_percentage?: number | null;
          community_fee_percentage?: number | null;
          community_live_status?:
            | Database["public"]["Enums"]["community_live_status_enum"]
            | null;
          community_token?: string | null;
          contribution_period_duration?: unknown | null;
          id?: string;
          location?: string | null;
          payment_method?: Json | null;
          prioritization_period_duration?: unknown | null;
          prioritization_period_start?: string | null;
          prioritization_quorum_percentage?: number | null;
          prioritization_reward_percentage?: number | null;
          proposal_absolute_reward?: number | null;
          proposal_relative_reward?: number | null;
          task_expiration_time?: string | null;
          total_members?: number | null;
          total_tasks?: number | null;
          user_roles?: Json | null;
          validation_period_duration?: unknown | null;
          validation_quorum_percentage?: number | null;
          validation_reward_percentage?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_organizations_private_info_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
      prices: {
        Row: {
          active: boolean | null;
          currency: string | null;
          description: string | null;
          id: string;
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null;
          interval_count: number | null;
          metadata: Json | null;
          product_id: string | null;
          trial_period_days: number | null;
          type: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount: number | null;
        };
        Insert: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Update: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          interval?:
            | Database["public"]["Enums"]["pricing_plan_interval"]
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database["public"]["Enums"]["pricing_type"] | null;
          unit_amount?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      prioritizations: {
        Row: {
          count: number;
          created_at: string;
          id: string;
          task_id: string;
          user_id: string;
        };
        Insert: {
          count: number;
          created_at?: string;
          id?: string;
          task_id?: string;
          user_id?: string;
        };
        Update: {
          count?: number;
          created_at?: string;
          id?: string;
          task_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_prioritizations_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_prioritizations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          active: boolean | null;
          description: string | null;
          id: string;
          image: string | null;
          metadata: Json | null;
          name: string | null;
        };
        Insert: {
          active?: boolean | null;
          description?: string | null;
          id: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Update: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Relationships: [];
      };
      project_comments: {
        Row: {
          created_at: string | null;
          id: number;
          in_reply_to: number | null;
          project_id: string;
          text: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          in_reply_to?: number | null;
          project_id: string;
          text: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          in_reply_to?: number | null;
          project_id?: string;
          text?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      projects: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          organization_id: string;
          project_status: Database["public"]["Enums"]["project_status"];
          team_id: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          organization_id: string;
          project_status?: Database["public"]["Enums"]["project_status"];
          team_id?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          organization_id?: string;
          project_status?: Database["public"]["Enums"]["project_status"];
          team_id?: number | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          cancel_at: string | null;
          cancel_at_period_end: boolean | null;
          canceled_at: string | null;
          created: string;
          current_period_end: string;
          current_period_start: string;
          ended_at: string | null;
          id: string;
          metadata: Json | null;
          organization_id: string | null;
          price_id: string | null;
          quantity: number | null;
          status: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end: string | null;
          trial_start: string | null;
        };
        Insert: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created: string;
          current_period_end: string;
          current_period_start: string;
          ended_at?: string | null;
          id: string;
          metadata?: Json | null;
          organization_id?: string | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
        };
        Update: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id?: string;
          metadata?: Json | null;
          organization_id?: string | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database["public"]["Enums"]["subscription_status"] | null;
          trial_end?: string | null;
          trial_start?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscriptions_price_id_fkey";
            columns: ["price_id"];
            isOneToOne: false;
            referencedRelation: "prices";
            referencedColumns: ["id"];
          }
        ];
      };
      task_types: {
        Row: {
          description: string | null;
          id: number;
          name: string;
          slug: string;
        };
        Insert: {
          description?: string | null;
          id?: never;
          name: string;
          slug: string;
        };
        Update: {
          description?: string | null;
          id?: never;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          created_at: string;
          description: string | null;
          efforts: number | null;
          files: Json | null;
          id: string;
          is_task_published: boolean | null;
          name: string;
          new_task_created_at: string;
          organization_id: string;
          project_status: Database["public"]["Enums"]["project_status"];
          rewards: number | null;
          task_community: string | null;
          task_status: Database["public"]["Enums"]["task_status"] | null;
          task_types: Json | null;
          team_id: number | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          efforts?: number | null;
          files?: Json | null;
          id?: string;
          is_task_published?: boolean | null;
          name: string;
          new_task_created_at: string;
          organization_id: string;
          project_status?: Database["public"]["Enums"]["project_status"];
          rewards?: number | null;
          task_community?: string | null;
          task_status?: Database["public"]["Enums"]["task_status"] | null;
          task_types?: Json | null;
          team_id?: number | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          efforts?: number | null;
          files?: Json | null;
          id?: string;
          is_task_published?: boolean | null;
          name?: string;
          new_task_created_at?: string;
          organization_id?: string;
          project_status?: Database["public"]["Enums"]["project_status"];
          rewards?: number | null;
          task_community?: string | null;
          task_status?: Database["public"]["Enums"]["task_status"] | null;
          task_types?: Json | null;
          team_id?: number | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      team_members: {
        Row: {
          created_at: string | null;
          id: number;
          role: Database["public"]["Enums"]["project_team_member_role"];
          team_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          role?: Database["public"]["Enums"]["project_team_member_role"];
          team_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          role?: Database["public"]["Enums"]["project_team_member_role"];
          team_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "team_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      teams: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
          organization_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          organization_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          organization_id?: string;
        };
        Relationships: [];
      };
      user_api_keys: {
        Row: {
          created_at: string;
          expires_at: string | null;
          is_revoked: boolean;
          key_id: string;
          masked_key: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          expires_at?: string | null;
          is_revoked?: boolean;
          key_id: string;
          masked_key: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          expires_at?: string | null;
          is_revoked?: boolean;
          key_id?: string;
          masked_key?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      user_notifications: {
        Row: {
          created_at: string;
          id: string;
          is_read: boolean;
          is_seen: boolean;
          payload: Json;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_read?: boolean;
          is_seen?: boolean;
          payload?: Json;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_read?: boolean;
          is_seen?: boolean;
          payload?: Json;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_notifications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      user_private_info: {
        Row: {
          created_at: string | null;
          default_organization: string | null;
          id: string;
          user_name: string | null;
        };
        Insert: {
          created_at?: string | null;
          default_organization?: string | null;
          id: string;
          user_name?: string | null;
        };
        Update: {
          created_at?: string | null;
          default_organization?: string | null;
          id?: string;
          user_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_user_private_info_default_organization_fkey";
            columns: ["default_organization"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_user_private_info_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "app_admin_all_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_user_private_info_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          first_name: string | null;
          full_name: string | null;
          id: string;
          last_name: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          first_name?: string | null;
          full_name?: string | null;
          id: string;
          last_name?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          first_name?: string | null;
          full_name?: string | null;
          id?: string;
          last_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_user_profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "app_admin_all_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_user_profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      validations: {
        Row: {
          contribution_id: string;
          count: number;
          created_at: string;
          description: string;
          files: Json;
          id: string;
          task_id: string;
          user_id: string;
        };
        Insert: {
          contribution_id?: string;
          count: number;
          created_at?: string;
          description: string;
          files: Json;
          id?: string;
          task_id?: string;
          user_id?: string;
        };
        Update: {
          contribution_id?: string;
          count?: number;
          created_at?: string;
          description?: string;
          files?: Json;
          id?: string;
          task_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_validations_contribution_id_fkey";
            columns: ["contribution_id"];
            isOneToOne: false;
            referencedRelation: "contributions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_validations_task_id_fkey";
            columns: ["task_id"];
            isOneToOne: false;
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_validations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      app_admin_all_users: {
        Row: {
          avatar_url: string | null;
          confirmed_at: string | null;
          created_at: string | null;
          email: string | null;
          full_name: string | null;
          id: string | null;
          is_app_admin: boolean | null;
          is_confirmed: boolean | null;
          last_sign_in_at: string | null;
          updated_at: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      app_admin_get_all_organizations: {
        Args: {
          search_query?: string;
          page?: number;
          page_size?: number;
        };
        Returns: {
          id: string;
          created_at: string;
          title: string;
          team_members_count: number;
          owner_full_name: string;
          owner_email: string;
          credits: number;
        }[];
      };
      app_admin_get_all_organizations_count: {
        Args: {
          search_query?: string;
        };
        Returns: number;
      };
      app_admin_get_all_users: {
        Args: {
          search_query?: string;
          page?: number;
          page_size?: number;
        };
        Returns: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
          full_name: string;
          avatar_url: string;
          is_app_admin: boolean;
          confirmed_at: string;
          is_confirmed: boolean;
          last_sign_in_at: string;
        }[];
      };
      app_admin_get_all_users_count: {
        Args: {
          search_query?: string;
        };
        Returns: number;
      };
      app_admin_get_organizations_created_per_month: {
        Args: Record<PropertyKey, never>;
        Returns: {
          month: string;
          number_of_organizations: number;
        }[];
      };
      app_admin_get_projects_created_per_month: {
        Args: Record<PropertyKey, never>;
        Returns: {
          month: string;
          number_of_projects: number;
        }[];
      };
      app_admin_get_recent_30_day_signin_count: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      app_admin_get_total_organization_count: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      app_admin_get_total_project_count: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      app_admin_get_total_user_count: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      app_admin_get_user_id_by_email: {
        Args: {
          emailarg: string;
        };
        Returns: string;
      };
      app_admin_get_users_created_per_month: {
        Args: Record<PropertyKey, never>;
        Returns: {
          month: string;
          number_of_users: number;
        }[];
      };
      check_if_authenticated_user_owns_email: {
        Args: {
          email: string;
        };
        Returns: boolean;
      };
      check_if_user_is_app_admin: {
        Args: {
          user_id: string;
        };
        Returns: boolean;
      };
      decrement_credits: {
        Args: {
          org_id: string;
          amount: number;
        };
        Returns: undefined;
      };
      disable_maintenance_mode: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      enable_maintenance_mode: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      get_all_app_admins: {
        Args: Record<PropertyKey, never>;
        Returns: {
          user_id: string;
        }[];
      };
      get_invited_organizations_for_user_v2: {
        Args: {
          user_id: string;
          user_email: string;
        };
        Returns: {
          organization_id: string;
        }[];
      };
      get_organization_admin_ids: {
        Args: {
          organization_id: string;
        };
        Returns: {
          member_id: string;
        }[];
      };
      get_organization_id_by_team_id:
        | {
            Args: {
              p_id: number;
            };
            Returns: string;
          }
        | {
            Args: {
              p_id: number;
            };
            Returns: string;
          };
      get_organization_id_for_project_id: {
        Args: {
          project_id: string;
        };
        Returns: string;
      };
      get_organization_member_ids: {
        Args: {
          organization_id: string;
        };
        Returns: {
          member_id: string;
        }[];
      };
      get_organizations_for_user: {
        Args: {
          user_id: string;
        };
        Returns: {
          organization_id: string;
        }[];
      };
      get_team_admins_by_team_id: {
        Args: {
          team_id: number;
        };
        Returns: {
          user_id: string;
        }[];
      };
      get_team_id_for_project_id: {
        Args: {
          project_id: string;
        };
        Returns: number;
      };
      get_team_members_team_id: {
        Args: {
          team_id: number;
        };
        Returns: {
          user_id: string;
        }[];
      };
      increment_credits: {
        Args: {
          org_id: string;
          amount: number;
        };
        Returns: undefined;
      };
      is_app_in_maintenance_mode: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_app_not_in_maintenance_mode: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      make_user_app_admin: {
        Args: {
          user_id: string;
        };
        Returns: undefined;
      };
      remove_app_admin_privilege_for_user: {
        Args: {
          user_id: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      app_admin_role: "moderator" | "admin" | "super_admin";
      community_filter_type:
        | "all_communities"
        | "my_communities"
        | "bookmarked";
      community_live_status_enum: "live" | "testnet";
      grant_project_status:
        | "draft"
        | "new_application"
        | "prioritized"
        | "project";
      grant_project_types:
        | "compute-network"
        | "cryptocurrency"
        | "data"
        | "developer-tooling"
        | "entertainment"
        | "financial-services"
        | "governance"
        | "marketplace"
        | "metaverse-gaming"
        | "mining-validation"
        | "network"
        | "news-info"
        | "physical-infrastructure-networks"
        | "security"
        | "synthetic-assets"
        | "wallet"
        | "other";
      internal_blog_post_status: "draft" | "published";
      internal_feedback_thread_priority: "low" | "medium" | "high";
      internal_feedback_thread_status:
        | "open"
        | "under_review"
        | "planned"
        | "closed"
        | "in_progress"
        | "completed";
      internal_feedback_thread_type: "bug" | "feature_request" | "general";
      maintenance_status: "inactive" | "active" | "scheduled";
      organization_join_invitation_link_status:
        | "active"
        | "finished_accepted"
        | "finished_declined"
        | "inactive";
      organization_joining_status:
        | "invited"
        | "joinied"
        | "declined_invitation"
        | "joined";
      organization_member_role: "owner" | "admin" | "member" | "readonly";
      pricing_plan_interval: "day" | "week" | "month" | "year";
      pricing_type: "one_time" | "recurring";
      project_status: "draft" | "pending_approval" | "approved" | "completed";
      project_team_member_role: "admin" | "member" | "readonly";
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused";
      task_status:
        | "draft"
        | "new_task"
        | "prioritized"
        | "claimed"
        | "in_progress"
        | "in_review"
        | "completed"
        | "failed"
        | "expired"
        | "protocol_update"
        | "freezed";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
