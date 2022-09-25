/* eslint-disable typescript-sort-keys/interface */
import type { UnixTimestamp } from "@modules/common/domain/unix-timestamp.vo";
import type { Uuid } from "@modules/common/domain/uuid.vo";
import type { ProfileAvatarUrlVO } from "./profile-avatar.vo";
import type { ProfileBioVO } from "./profile-bio.vo";
import type { ProfileUsernameVO } from "./profile-username.vo";
import type { ProfileWalletVO } from "./profile-wallet.vo";

export type Profile = {
	id: Uuid;
	username: ProfileUsernameVO;
	bio?: ProfileBioVO;
	avatarUrl?: ProfileAvatarUrlVO;
	joinedOn: UnixTimestamp;
	walletAddress: ProfileWalletVO;
};
