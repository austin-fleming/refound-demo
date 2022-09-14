export type RankingDetails = {
	votes: string;
	ratio: number;
};

export type PostRanking = {
	community: RankingDetails;
	stakers: RankingDetails;
};
