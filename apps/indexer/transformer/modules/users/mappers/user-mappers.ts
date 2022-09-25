import type { User } from "@supabase/supabase-js";

interface IUserMap {
  toDTO(user: UserAggregate): UserDTO;
  toDomain(raw: UserDTO | UserPO): UserAggregate;
  toPersistence(user: User): Promise<UserPO>;
}

const toDTO = (user: UserAggregate): UserDTO => {};

const toDomain = (raw: UserDTO | UserPO): UserAggregate => {};

const toPersistence = (user: UserAggregate): Promise<UserPO> => {};

export const userMappers: IUserMap = {
  toDTO,
  toDomain,
  toPersistence,
};
