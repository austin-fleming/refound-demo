import { config } from "config/config";
import { useContract } from "./use-contract";

export const useRefoundContract = () =>
	useContract(config.contracts.refound.abi, config.contracts.refound.address);
