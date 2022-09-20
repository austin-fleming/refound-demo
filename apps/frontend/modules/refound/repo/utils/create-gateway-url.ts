export const createGatewayUrl = (cid: string, path: string) => {
	return `https://${cid}.ipfs.w3s.link/${encodeURIComponent(path)}`;
};
