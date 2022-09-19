import type { ProfileOwnerAddress } from "@modules/refound/models/profile.model";
import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import axios from "axios";

export const fetchWithAddress = async <T>(
	endpoint: string,
	address?: ProfileOwnerAddress,
): Promise<Result<T>> => {
	try {
		const url = address ? `${endpoint}?requester=${address}` : endpoint;
		const response = await axios.get<T>(url);
		return result.ok(response.data);
	} catch (err) {
		return result.fail(err as Error);
	}
};
