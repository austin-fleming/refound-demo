import type { Either } from "@utils/type-utils/either";
import { left, right } from "@utils/type-utils/either";

type Email = string;

const isValidEmail = (email: unknown): email is Email => Boolean(email);

export const create = (email: Email): Either<Error, Email> => {
  const validEmail = isValidEmail(email);

  // TODO: replace with legit error
  return validEmail ? right(email) : left(new Error("Email is invalid"));
};

export const userEmail = {
  create,
};
