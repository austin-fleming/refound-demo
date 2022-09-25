import type { SupabaseClient } from "../supabase-client";
import type { InferType, ObjectSchema } from "yup";
// import { boolean } from "yup";
// import { object, string } from "yup";
import * as yup from "yup";
import { randomUUID } from "node:crypto";

type UuidV4 = string;

type Timestamp = string;

type PasswordHash = string;

// TODO: how to type default values? This creates a discrepancy between required fields when writing and expectations when retrieving

/* eslint-disable typescript-sort-keys/interface, sort-keys, sort-keys-fix/sort-keys-fix */
interface BaseUserShape {
  base_user_id: string; // PK, DEFAULT UuidV4
  email_account: string; // UNIQUE
  is_email_verified: boolean; // DEFAULT false
  password_hash: string;
  is_admin: boolean; // DEFAULT false
  created_at: string; // DEFAULT now
  updated_at: string; // DEFAULT now
}

const baseUserInputSchema = yup.object({
  base_user_id: yup
    .string()
    .uuid()
    .default(() => randomUUID())
    .required(),
  email_account: yup.string().email().trim().lowercase().required(),
  is_email_verified: yup.boolean().default(false).required(),
  password_hash: yup.string().required(),
  is_admin: yup.boolean().default(false).required(),
  created_at: yup
    .string()
    .default(() => new Date().toISOString())
    .required(),
  updated_at: yup
    .string()
    .default(() => new Date().toISOString())
    .required(),
});
/* eslint-enable typescript-sort-keys/interface, sort-keys, sort-keys-fix/sort-keys-fix */

type ValidatedUser = InferType<typeof baseUserInputSchema>;

export const baseUserModel = (supabaseClient: SupabaseClient) =>
  supabaseClient.from("base_user");
