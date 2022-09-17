/* 
struct Campaign {
        address creator;
        uint goal;
        string title;
        string description;
        string imageLink;
        uint pledged;
        uint startAt;
        uint endAt;
        bool claimed;
    }
*/

export type PoolDTO = {
	creator: string; // address
	goal: number;
	title: string;
	description: string;
	imageLink: string;
	pledged: number;
	startAt: number; // unix timestamp
	endAt: number; // unix timestamp
	claimed: boolean;
};
