import type { Either } from "@utils/type-utils/either";
import { left, right } from "@utils/type-utils/either";
import type { MarkOptional } from "@utils/type-utils/mark-optional";
import { createIdentifier } from "typescript";

// TODO: these types need work.
type UserAggregate = {
  accessToken?: JWTToken;
  blurb: UserBlurb;
  email: UserEmail;
  id: UniqueEntityId;
  isAdmin: UserIsAdmin;
  lastLogin: Date;
  name: UserName;
  password: UserPassword;
  refreshToken?: RefreshToken;
};

type User = {
  blurb: UserBlurb;
  email: UserEmail;
  id: UniqueEntityId;
  isAdmin: UserIsAdmin;
  lastLogin: Date;
  name: UserName;
  password: UserPassword;
};

type UserAuthCredentials = {
  accessToken?: JWTToken;
  refreshToken?: RefreshToken;
};

type UserInformation = Pick<User, "blurb" | "email" | "name" | "password">;

type LoggedInUser = User & UserAuthCredentials;

type UserAggregateProperties = MarkOptional<UserAggregate, "id">;

type MakeUser = (
  makeUserProperties: UserInformation | User
) => Either<Error, User>;

const makeUser: MakeUser = (userInformation) => {
  // TODO: validation should be in api layer as an "anti corruption layer"

  // TODO: use legit error
  if (!userInformation) return left(new Error("No properties passed"));

  const isNewUser = !userInformation.id;

  if (isNewUser) addDomainEvent("NEW_USER_CREATED");

  const user = Object.freeze({
    ...userInformation,
    id: userInformation.id || createIdentifier(),
  });

  return right(user);
};

// TODO: this is an aggregate
type MakeLoggedInUser = (user: User) => LoggedInUser;
