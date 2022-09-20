import type { Result } from "@utils/monads";
import { result } from "@utils/monads";

export const moderateImage = async (image: File): Promise<Result<boolean>> => {
	// const imageBytes =
	// rekognition(imageBytes)

	return result.ok(true);
};
