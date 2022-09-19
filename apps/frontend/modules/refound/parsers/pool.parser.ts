import type { Result } from "@utils/monads";
import { result } from "@utils/monads";
import { unixTimestamp } from "@utils/unix-timestamp";
import type { PoolAggregate } from "../models/pool.aggregate";
import type { PoolDTO } from "../models/pool.dto";
import type { Pool, PoolId } from "../models/pool.model";
import type { Profile } from "../models/profile.model";
import { throwFieldError } from "./utils/throw-field-error";

const dtoToModel = (poolDTO: PoolDTO, creatorAddress: string): Result<Pool> => {
	try {
		if (!poolDTO) throwFieldError("poolDTO");

		const startAt: Date = unixTimestamp.toDate(poolDTO.startAt).unwrapOrElse((err) => {
			throw err;
		});
		const endAt: Date = unixTimestamp.toDate(poolDTO.endAt).unwrapOrElse((err) => {
			throw err;
		});

		if (!creatorAddress) throwFieldError("creatorAddress");

		const pool: Pool = {
			...poolDTO,
			creatorAddress,
			startAt,
			endAt,
		};

		return result.ok(pool);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const modelToAggregate = (pool: Pool, profile: Profile): Result<PoolAggregate> => {
	try {
		if (!pool) throwFieldError("pool");
		if (!profile) throwFieldError("profile");

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { creatorAddress, ...aggregateProps } = pool;

		const aggregate: PoolAggregate = {
			...aggregateProps,
			creator: profile,
		};

		return result.ok(aggregate);
	} catch (err) {
		return result.fail(err as Error);
	}
};

const dtoToAggregate = (poolDTO: PoolDTO, profile: Profile): Result<PoolAggregate> =>
	dtoToModel(poolDTO, profile.address).chainOk((pool) => modelToAggregate(pool, profile));

export const poolParser = {
	dtoToModel,
	modelToAggregate,
	dtoToAggregate,
};
