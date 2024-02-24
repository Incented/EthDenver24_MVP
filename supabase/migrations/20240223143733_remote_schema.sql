create type "public"."community_filter_type" as enum ('all_communities', 'my_communities', 'bookmarked');

create type "public"."community_live_status_enum" as enum ('live', 'testnet');

create type "public"."task_status" as enum ('draft', 'new_task', 'prioritized', 'claimed', 'in_progress', 'in_review', 'completed', 'failed', 'expired', 'protocol_update', 'freezed');

drop policy "All organization members can read organizations" on "public"."organizations";

drop policy "All team members can read organizations" on "public"."organizations";

create table "public"."bookmarked_organizations" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "organization_id" uuid not null
);


alter table "public"."bookmarked_organizations" enable row level security;

create table "public"."claimed_tasks" (
    "task_id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


create table "public"."contributions" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "task_id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null default gen_random_uuid(),
    "description" text not null,
    "files" jsonb not null,
    "links" jsonb not null
);


create table "public"."freezed_tasks" (
    "task_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."freezed_tasks" enable row level security;

create table "public"."prioritizations" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "task_id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null default gen_random_uuid(),
    "count" real not null
);


create table "public"."task_types" (
    "id" integer generated always as identity not null,
    "slug" text not null,
    "name" text not null,
    "description" text
);


alter table "public"."task_types" enable row level security;

create table "public"."tasks" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "created_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "organization_id" uuid not null,
    "team_id" bigint,
    "project_status" project_status not null default 'draft'::project_status,
    "description" text,
    "rewards" bigint,
    "efforts" bigint,
    "user_id" uuid,
    "files" jsonb,
    "task_types" jsonb,
    "is_task_published" boolean,
    "task_community" text,
    "task_status" task_status,
    "new_task_created_at" timestamp with time zone not null
);


create table "public"."validations" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "task_id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null default gen_random_uuid(),
    "count" real not null,
    "description" text not null,
    "files" jsonb not null,
    "contribution_id" uuid not null default gen_random_uuid()
);


alter table "public"."organizations" add column "active_tasks" bigint;

alter table "public"."organizations" add column "addresses_with_veto" text;

alter table "public"."organizations" add column "carrot_pot_initial_amount" bigint;

alter table "public"."organizations" add column "claim_lock_period_duration" interval;

alter table "public"."organizations" add column "claim_stake_amount_percentage" bigint;

alter table "public"."organizations" add column "community_fee_percentage" bigint;

alter table "public"."organizations" add column "contribution_period" bigint;

alter table "public"."organizations" add column "description" character varying(255);

alter table "public"."organizations" add column "facebook_url" text;

alter table "public"."organizations" add column "instagram_url" text;

alter table "public"."organizations" add column "linkedin_url" text;

alter table "public"."organizations" add column "location" character varying(255);

alter table "public"."organizations" add column "prioritization_period" bigint;

alter table "public"."organizations" add column "prioritization_quorum_percentage" bigint;

alter table "public"."organizations" add column "prioritization_reward_percentage" bigint;

alter table "public"."organizations" add column "proposal_absolute_reward" bigint;

alter table "public"."organizations" add column "task_expiration_time" timestamp with time zone;

alter table "public"."organizations" add column "total_members" bigint;

alter table "public"."organizations" add column "total_tasks" bigint;

alter table "public"."organizations" add column "twitter_url" text;

alter table "public"."organizations" add column "validation_period" bigint;

alter table "public"."organizations" add column "validation_quorum_percentage" bigint;

alter table "public"."organizations" add column "validation_reward_percentage" bigint;

alter table "public"."organizations" add column "website_url" text;

alter table "public"."organizations" add column "youtube_url" text;

alter table "public"."organizations_private_info" add column "active_tasks" bigint;

alter table "public"."organizations_private_info" add column "addresses_with_veto" text;

alter table "public"."organizations_private_info" add column "carrot_pot_initial_amount" bigint;

alter table "public"."organizations_private_info" add column "claim_lock_period_duration" interval;

alter table "public"."organizations_private_info" add column "claim_stake_amount_percentage" bigint;

alter table "public"."organizations_private_info" add column "community_fee_percentage" bigint;

alter table "public"."organizations_private_info" add column "community_live_status" community_live_status_enum;

alter table "public"."organizations_private_info" add column "community_token" character varying(255);

alter table "public"."organizations_private_info" add column "contribution_period_duration" interval;

alter table "public"."organizations_private_info" add column "location" character varying(255);

alter table "public"."organizations_private_info" add column "prioritization_period_duration" interval;

alter table "public"."organizations_private_info" add column "prioritization_period_start" timestamp with time zone;

alter table "public"."organizations_private_info" add column "prioritization_quorum_percentage" bigint;

alter table "public"."organizations_private_info" add column "prioritization_reward_percentage" bigint;

alter table "public"."organizations_private_info" add column "proposal_absolute_reward" bigint;

alter table "public"."organizations_private_info" add column "proposal_relative_reward" bigint;

alter table "public"."organizations_private_info" add column "task_expiration_time" timestamp with time zone;

alter table "public"."organizations_private_info" add column "total_members" bigint;

alter table "public"."organizations_private_info" add column "total_tasks" bigint;

alter table "public"."organizations_private_info" add column "user_roles" jsonb;

alter table "public"."organizations_private_info" add column "validation_period_duration" interval;

alter table "public"."organizations_private_info" add column "validation_quorum_percentage" bigint;

alter table "public"."organizations_private_info" add column "validation_reward_percentage" bigint;

alter table "public"."user_private_info" add column "user_name" character varying;

alter table "public"."user_profiles" add column "first_name" character varying;

alter table "public"."user_profiles" add column "last_name" character varying;

CREATE UNIQUE INDEX claimed_tasks_pkey ON public.claimed_tasks USING btree (user_id);

CREATE UNIQUE INDEX contributions_pkey ON public.contributions USING btree (id);

CREATE UNIQUE INDEX freezed_tasks_pkey ON public.freezed_tasks USING btree (task_id);

CREATE INDEX organizations_title_idx ON public.organizations USING btree (title);

CREATE UNIQUE INDEX prioritizations_pkey ON public.prioritizations USING btree (id);

CREATE UNIQUE INDEX task_types_pkey ON public.task_types USING btree (id);

CREATE UNIQUE INDEX tasks_pkey ON public.tasks USING btree (id);

CREATE UNIQUE INDEX validations_pkey ON public.validations USING btree (id);

alter table "public"."claimed_tasks" add constraint "claimed_tasks_pkey" PRIMARY KEY using index "claimed_tasks_pkey";

alter table "public"."contributions" add constraint "contributions_pkey" PRIMARY KEY using index "contributions_pkey";

alter table "public"."freezed_tasks" add constraint "freezed_tasks_pkey" PRIMARY KEY using index "freezed_tasks_pkey";

alter table "public"."prioritizations" add constraint "prioritizations_pkey" PRIMARY KEY using index "prioritizations_pkey";

alter table "public"."task_types" add constraint "task_types_pkey" PRIMARY KEY using index "task_types_pkey";

alter table "public"."tasks" add constraint "tasks_pkey" PRIMARY KEY using index "tasks_pkey";

alter table "public"."validations" add constraint "validations_pkey" PRIMARY KEY using index "validations_pkey";

alter table "public"."claimed_tasks" add constraint "public_claimed_tasks_task_id_fkey" FOREIGN KEY (task_id) REFERENCES tasks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."claimed_tasks" validate constraint "public_claimed_tasks_task_id_fkey";

alter table "public"."claimed_tasks" add constraint "public_claimed_tasks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."claimed_tasks" validate constraint "public_claimed_tasks_user_id_fkey";

alter table "public"."contributions" add constraint "public_contributions_task_id_fkey" FOREIGN KEY (task_id) REFERENCES tasks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."contributions" validate constraint "public_contributions_task_id_fkey";

alter table "public"."contributions" add constraint "public_contributions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."contributions" validate constraint "public_contributions_user_id_fkey";

alter table "public"."freezed_tasks" add constraint "public_freezed_tasks_task_id_fkey" FOREIGN KEY (task_id) REFERENCES tasks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."freezed_tasks" validate constraint "public_freezed_tasks_task_id_fkey";

alter table "public"."prioritizations" add constraint "public_prioritizations_task_id_fkey" FOREIGN KEY (task_id) REFERENCES tasks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."prioritizations" validate constraint "public_prioritizations_task_id_fkey";

alter table "public"."prioritizations" add constraint "public_prioritizations_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."prioritizations" validate constraint "public_prioritizations_user_id_fkey";

alter table "public"."validations" add constraint "public_validations_contribution_id_fkey" FOREIGN KEY (contribution_id) REFERENCES contributions(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."validations" validate constraint "public_validations_contribution_id_fkey";

alter table "public"."validations" add constraint "public_validations_task_id_fkey" FOREIGN KEY (task_id) REFERENCES tasks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."validations" validate constraint "public_validations_task_id_fkey";

alter table "public"."validations" add constraint "public_validations_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."validations" validate constraint "public_validations_user_id_fkey";

grant delete on table "public"."bookmarked_organizations" to "anon";

grant insert on table "public"."bookmarked_organizations" to "anon";

grant references on table "public"."bookmarked_organizations" to "anon";

grant select on table "public"."bookmarked_organizations" to "anon";

grant trigger on table "public"."bookmarked_organizations" to "anon";

grant truncate on table "public"."bookmarked_organizations" to "anon";

grant update on table "public"."bookmarked_organizations" to "anon";

grant delete on table "public"."bookmarked_organizations" to "authenticated";

grant insert on table "public"."bookmarked_organizations" to "authenticated";

grant references on table "public"."bookmarked_organizations" to "authenticated";

grant select on table "public"."bookmarked_organizations" to "authenticated";

grant trigger on table "public"."bookmarked_organizations" to "authenticated";

grant truncate on table "public"."bookmarked_organizations" to "authenticated";

grant update on table "public"."bookmarked_organizations" to "authenticated";

grant delete on table "public"."bookmarked_organizations" to "service_role";

grant insert on table "public"."bookmarked_organizations" to "service_role";

grant references on table "public"."bookmarked_organizations" to "service_role";

grant select on table "public"."bookmarked_organizations" to "service_role";

grant trigger on table "public"."bookmarked_organizations" to "service_role";

grant truncate on table "public"."bookmarked_organizations" to "service_role";

grant update on table "public"."bookmarked_organizations" to "service_role";

grant delete on table "public"."claimed_tasks" to "anon";

grant insert on table "public"."claimed_tasks" to "anon";

grant references on table "public"."claimed_tasks" to "anon";

grant select on table "public"."claimed_tasks" to "anon";

grant trigger on table "public"."claimed_tasks" to "anon";

grant truncate on table "public"."claimed_tasks" to "anon";

grant update on table "public"."claimed_tasks" to "anon";

grant delete on table "public"."claimed_tasks" to "authenticated";

grant insert on table "public"."claimed_tasks" to "authenticated";

grant references on table "public"."claimed_tasks" to "authenticated";

grant select on table "public"."claimed_tasks" to "authenticated";

grant trigger on table "public"."claimed_tasks" to "authenticated";

grant truncate on table "public"."claimed_tasks" to "authenticated";

grant update on table "public"."claimed_tasks" to "authenticated";

grant delete on table "public"."claimed_tasks" to "service_role";

grant insert on table "public"."claimed_tasks" to "service_role";

grant references on table "public"."claimed_tasks" to "service_role";

grant select on table "public"."claimed_tasks" to "service_role";

grant trigger on table "public"."claimed_tasks" to "service_role";

grant truncate on table "public"."claimed_tasks" to "service_role";

grant update on table "public"."claimed_tasks" to "service_role";

grant delete on table "public"."contributions" to "anon";

grant insert on table "public"."contributions" to "anon";

grant references on table "public"."contributions" to "anon";

grant select on table "public"."contributions" to "anon";

grant trigger on table "public"."contributions" to "anon";

grant truncate on table "public"."contributions" to "anon";

grant update on table "public"."contributions" to "anon";

grant delete on table "public"."contributions" to "authenticated";

grant insert on table "public"."contributions" to "authenticated";

grant references on table "public"."contributions" to "authenticated";

grant select on table "public"."contributions" to "authenticated";

grant trigger on table "public"."contributions" to "authenticated";

grant truncate on table "public"."contributions" to "authenticated";

grant update on table "public"."contributions" to "authenticated";

grant delete on table "public"."contributions" to "service_role";

grant insert on table "public"."contributions" to "service_role";

grant references on table "public"."contributions" to "service_role";

grant select on table "public"."contributions" to "service_role";

grant trigger on table "public"."contributions" to "service_role";

grant truncate on table "public"."contributions" to "service_role";

grant update on table "public"."contributions" to "service_role";

grant delete on table "public"."freezed_tasks" to "anon";

grant insert on table "public"."freezed_tasks" to "anon";

grant references on table "public"."freezed_tasks" to "anon";

grant select on table "public"."freezed_tasks" to "anon";

grant trigger on table "public"."freezed_tasks" to "anon";

grant truncate on table "public"."freezed_tasks" to "anon";

grant update on table "public"."freezed_tasks" to "anon";

grant delete on table "public"."freezed_tasks" to "authenticated";

grant insert on table "public"."freezed_tasks" to "authenticated";

grant references on table "public"."freezed_tasks" to "authenticated";

grant select on table "public"."freezed_tasks" to "authenticated";

grant trigger on table "public"."freezed_tasks" to "authenticated";

grant truncate on table "public"."freezed_tasks" to "authenticated";

grant update on table "public"."freezed_tasks" to "authenticated";

grant delete on table "public"."freezed_tasks" to "service_role";

grant insert on table "public"."freezed_tasks" to "service_role";

grant references on table "public"."freezed_tasks" to "service_role";

grant select on table "public"."freezed_tasks" to "service_role";

grant trigger on table "public"."freezed_tasks" to "service_role";

grant truncate on table "public"."freezed_tasks" to "service_role";

grant update on table "public"."freezed_tasks" to "service_role";

grant delete on table "public"."prioritizations" to "anon";

grant insert on table "public"."prioritizations" to "anon";

grant references on table "public"."prioritizations" to "anon";

grant select on table "public"."prioritizations" to "anon";

grant trigger on table "public"."prioritizations" to "anon";

grant truncate on table "public"."prioritizations" to "anon";

grant update on table "public"."prioritizations" to "anon";

grant delete on table "public"."prioritizations" to "authenticated";

grant insert on table "public"."prioritizations" to "authenticated";

grant references on table "public"."prioritizations" to "authenticated";

grant select on table "public"."prioritizations" to "authenticated";

grant trigger on table "public"."prioritizations" to "authenticated";

grant truncate on table "public"."prioritizations" to "authenticated";

grant update on table "public"."prioritizations" to "authenticated";

grant delete on table "public"."prioritizations" to "service_role";

grant insert on table "public"."prioritizations" to "service_role";

grant references on table "public"."prioritizations" to "service_role";

grant select on table "public"."prioritizations" to "service_role";

grant trigger on table "public"."prioritizations" to "service_role";

grant truncate on table "public"."prioritizations" to "service_role";

grant update on table "public"."prioritizations" to "service_role";

grant delete on table "public"."task_types" to "anon";

grant insert on table "public"."task_types" to "anon";

grant references on table "public"."task_types" to "anon";

grant select on table "public"."task_types" to "anon";

grant trigger on table "public"."task_types" to "anon";

grant truncate on table "public"."task_types" to "anon";

grant update on table "public"."task_types" to "anon";

grant delete on table "public"."task_types" to "authenticated";

grant insert on table "public"."task_types" to "authenticated";

grant references on table "public"."task_types" to "authenticated";

grant select on table "public"."task_types" to "authenticated";

grant trigger on table "public"."task_types" to "authenticated";

grant truncate on table "public"."task_types" to "authenticated";

grant update on table "public"."task_types" to "authenticated";

grant delete on table "public"."task_types" to "service_role";

grant insert on table "public"."task_types" to "service_role";

grant references on table "public"."task_types" to "service_role";

grant select on table "public"."task_types" to "service_role";

grant trigger on table "public"."task_types" to "service_role";

grant truncate on table "public"."task_types" to "service_role";

grant update on table "public"."task_types" to "service_role";

grant delete on table "public"."tasks" to "anon";

grant insert on table "public"."tasks" to "anon";

grant references on table "public"."tasks" to "anon";

grant select on table "public"."tasks" to "anon";

grant trigger on table "public"."tasks" to "anon";

grant truncate on table "public"."tasks" to "anon";

grant update on table "public"."tasks" to "anon";

grant delete on table "public"."tasks" to "authenticated";

grant insert on table "public"."tasks" to "authenticated";

grant references on table "public"."tasks" to "authenticated";

grant select on table "public"."tasks" to "authenticated";

grant trigger on table "public"."tasks" to "authenticated";

grant truncate on table "public"."tasks" to "authenticated";

grant update on table "public"."tasks" to "authenticated";

grant delete on table "public"."tasks" to "service_role";

grant insert on table "public"."tasks" to "service_role";

grant references on table "public"."tasks" to "service_role";

grant select on table "public"."tasks" to "service_role";

grant trigger on table "public"."tasks" to "service_role";

grant truncate on table "public"."tasks" to "service_role";

grant update on table "public"."tasks" to "service_role";

grant delete on table "public"."validations" to "anon";

grant insert on table "public"."validations" to "anon";

grant references on table "public"."validations" to "anon";

grant select on table "public"."validations" to "anon";

grant trigger on table "public"."validations" to "anon";

grant truncate on table "public"."validations" to "anon";

grant update on table "public"."validations" to "anon";

grant delete on table "public"."validations" to "authenticated";

grant insert on table "public"."validations" to "authenticated";

grant references on table "public"."validations" to "authenticated";

grant select on table "public"."validations" to "authenticated";

grant trigger on table "public"."validations" to "authenticated";

grant truncate on table "public"."validations" to "authenticated";

grant update on table "public"."validations" to "authenticated";

grant delete on table "public"."validations" to "service_role";

grant insert on table "public"."validations" to "service_role";

grant references on table "public"."validations" to "service_role";

grant select on table "public"."validations" to "service_role";

grant trigger on table "public"."validations" to "service_role";

grant truncate on table "public"."validations" to "service_role";

grant update on table "public"."validations" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."bookmarked_organizations"
as permissive
for delete
to authenticated
using ((auth.uid() = id));


create policy "Enable insert for users based on user_id"
on "public"."bookmarked_organizations"
as permissive
for insert
to authenticated
with check ((auth.uid() = id));


create policy "Enable select for users based on user_id"
on "public"."bookmarked_organizations"
as permissive
for select
to authenticated
using ((auth.uid() = id));


create policy "Enable read access for all users"
on "public"."freezed_tasks"
as permissive
for select
to public
using (true);


create policy "All authenticated users can read organizations"
on "public"."organizations"
as permissive
for select
to authenticated
using (true);


create policy "Enable all users for all operations on task types"
on "public"."task_types"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable delete for community admins"
on "public"."tasks"
as permissive
for delete
to public
using ((auth.uid() IN ( SELECT get_organization_admin_ids(tasks.organization_id) AS get_organization_admin_ids)));


create policy "Enable insert for authenticated users only"
on "public"."tasks"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."tasks"
as permissive
for select
to public
using (true);


create policy "Enable update to authenticated users only"
on "public"."tasks"
as permissive
for update
to authenticated
using (true)
with check (true);



