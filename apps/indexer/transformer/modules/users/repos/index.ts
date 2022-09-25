import { supabaseClient } from "@common/infrastructure/db/supabase/supabase-client";
import type { PostgrestResponse } from "@supabase/supabase-js";
import type { Either } from "@utils/type-utils/either";
import { right } from "@utils/type-utils/either";
import { left } from "@utils/type-utils/either";

export interface IUserRepo {
  exists: (userEmail: UserEmail) => Promise<Either<Error, boolean>>;
  save: (user: UserAggregate) => Promise<Either<Error, UserPO>>;
}

const exists =
  (models): IUserRepo["exists"] =>
  async (userEmail: UserEmail) => {
    const { data: userData, error } = await supabaseClient
      .from("base_user")
      .select("email_account")
      .eq("email_account", userEmail);

    if (error) return left(parseSupabaseError(error));

    // TODO: should this be combined with "userData.length === 0", is this an error, or will this never happen?
    if (!userData) return right(false);

    if (userData.length === 0) return right(false);

    // TODO: should this even be checked for?
    if (userData.length > 1)
      return left(
        new Error(
          `Database corruption. Multiple base_users exist for email: ${userEmail}`
        )
      );

    return right(true);
  };

const save =
  (models): IUserRepo["save"] =>
  async (user) => {
    return left(new Error("method not written yet"));
  };

export const makeUserRepo = (models): IUserRepo => ({
  exists: exists(models),
  save: save(models),
});
