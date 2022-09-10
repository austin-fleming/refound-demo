import { ProfilePage } from "@components/profile/profile-page";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const Profile: NextPage = () => {
	const router = useRouter();
	const { username } = router.query;

	return <ProfilePage username={username as string} />;
};

export default Profile;
