import { userEmail } from "@modules/users/domain/user-email.vo";
import type { IUserRepo } from "@modules/users/repos";
import type { Either } from "@utils/type-utils/either";
import { left, right } from "@utils/type-utils/either";
import type { AddUserDTO } from "./add-user.dto";

export const addUserUseCase =
  (userRepo: IUserRepo) =>
  async (request: Request): Promise<Either<Error, AddUserUseCaseResponse>> => {
    const { name, email, password, blurb, signup_code } = request as AddUserDTO;

    // RULE: must have a base_user and editor

    const nameOrError = Name.create({ name });
    if (nameOrError.isLeft()) return left(nameOrError.value);

    const emailOrError = userEmail.create(email);
    if (emailOrError.isLeft()) return left(emailOrError.unwrap());

    const passwordOrError = Password.create({ password });
    if (passwordOrError.isLeft()) return left(passwordOrError.value);

    const blurbOrError = Blurb.create({ blurb });
    if (blurbOrError.isLeft()) return left(blurbOrError.value);

    // This is a little odd. I'm going to have a signup code to protect sign ups.
    // There may be multiple codes corresponding to role.
    // DTO on GET should be {signup_code: null, role: Role}
    // DTO on POST should be {signup_code: string, role: null}
    const roleOrError = Role.create({ signup_code });
    if (roleOrError.isLeft()) return left(roleOrError.value);

    try {
      // This validation clump should probably be in Email object.
      const [userByEmail] = await Promise.all([userRepo.getUserByEmail(email)]);
      const emailIsDuplicate = Boolean(userByEmail);
      if (emailIsDuplicate) return left(addUserError.emailTakenError(email));

      // Should this validate it was actually created? else how should i get the created object?
      const result = userRepo.getUserByEmail(email) as AddUserDTO;
      if (!result) return left(addUserError.failedToAddUserToDbError());

      // Return the created resource.
      return right(result);
    } catch (error) {
      return left(AppError.UnexpectedError(error));
    }
  };
