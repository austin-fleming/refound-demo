export const createGatewayUrl = (cid: string, path: string) => {
	return `https://${cid}.ipfs.dweb.link/${encodeURIComponent(path)}`;
};
