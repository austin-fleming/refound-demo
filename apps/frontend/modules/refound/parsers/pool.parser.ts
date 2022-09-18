import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import type { PoolDTO } from "../models/pool.dto";
import type { Pool } from "../models/pool.model";

const dtoToModel = (poolDTO: PoolDTO): Result<Pool> => {
	try {
	} catch (err) {
		return result.fail(err as Error);
	}
};

const creationPropsToDto = ()